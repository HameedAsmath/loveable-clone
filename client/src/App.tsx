import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChatBox from "./components/chatbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Preview from "./components/preview";
import CodeEditor from "./components/code";
import FileExplorer from "./components/fileExplorer";
import {
  convertRepoToWebContainerFS,
  ensureDir,
  liveFilesToFileTree,
  templateToLiveFiles,
} from "./utils";
import { WebContainer } from "@webcontainer/api";
import { Code2, Eye, Sparkles } from "lucide-react";

interface IActiveFile {
  path: string;
  language: string;
  content: string;
}
export interface ILiveFile {
  path: string;
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [prompt, setPrompt] = useState("");
  const [activeFile, setActiveFile] = useState<IActiveFile | null>(null);
  const [template, setTemplate] = useState<Record<string, any> | null>(null);
  const [history, setHistory] = useState<
    { role: "user" | "assistant"; feedback: string }[]
  >([]);

  const [plan, setPlan] = useState<string>("");
  const [liveFiles, setLiveFiles] = useState<ILiveFile[]>([]);
  const [touchedFiles, setTouchedFiles] = useState<ILiveFile[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [bootError, setBootError] = useState<string | null>(null);

  const containerRef = useRef<WebContainer | null>(null);

  const IGNORE_PATHS = ["/src/components/ui"];

  useEffect(() => {
    if (template) {
      setLiveFiles(templateToLiveFiles(template));
    }
  }, [template]);

  const handleStream = async (userPrompt: string) => {
    try {
      if (!containerRef.current) return;

      setIsStreaming(true);
      const readDirRecursive = async (dir: string): Promise<ILiveFile[]> => {
        const entries = await containerRef.current!.fs.readdir(dir, {
          withFileTypes: true,
        });
        const results: ILiveFile[] = [];

        await Promise.all(
          entries.map(async (entry) => {
            const fullPath = `${dir}/${entry.name}`;
            if (IGNORE_PATHS.some((p) => fullPath.startsWith(p))) return;
            if (entry.isDirectory()) {
              const nested = await readDirRecursive(fullPath);
              results.push(...nested);
            } else {
              const content = await containerRef.current!.fs.readFile(
                fullPath,
                "utf-8",
              );
              results.push({ path: fullPath, content });
            }
          }),
        );

        return results;
      };
      const files = await readDirRecursive("/src");
      const package_json = await containerRef.current.fs.readFile(
        "/package.json",
        "utf-8",
      );

      const response = await fetch(`${API_URL}/edit-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history,
          feedback: userPrompt,
          code_files: files,
          package_json,
        }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const events = chunk.split("\n\n");

        for (const event of events) {
          if (!event.startsWith("data:")) continue;
          const data = JSON.parse(event.replace("data:", "").trim());

          if (data.plan) {
            setPlan(data.plan);
          }

          if (data.file) {
            const { path, content } = data.file;

            await ensureDir(containerRef.current!, path);
            await containerRef.current!.fs.writeFile(path, content);

            setLiveFiles((prev) => {
              const exists = prev.find((f) => f.path === path);
              if (!exists) return [...prev, { path, content }];
              return prev.map((f) => (f.path === path ? { ...f, content } : f));
            });

            setTouchedFiles((prev) => {
              const exists = prev.find((f) => f.path === path);
              if (!exists) return [...prev, { path, content }];
              return prev.map((f) => (f.path === path ? { ...f, content } : f));
            });
          }

          if (data.done) {
            setIsStreaming(false);
            setHistory((prev) => [
              ...prev,
              { role: "user", feedback: userPrompt },
              { role: "assistant", feedback: plan },
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Error during streaming:", error);
      setIsStreaming(false);
    }
  };

  const handleSelectFile = (file: IActiveFile) => {
    const live = liveFiles.find((f) => f.path === file.path);
    setActiveFile({
      path: file.path,
      language: file.language,
      content: live ? live.content : file.content,
    });
  };

    useEffect(() => {
    if (liveFiles.length > 0 && !activeFile) {
      const appFile = liveFiles.find((f) => f.path.endsWith("/src/App.tsx"));
      if (appFile) {
        setActiveFile({
          path: appFile.path,
          language: "typescript",
          content: appFile.content,
        });
      }
    }
  }, [liveFiles]);

  useEffect(() => {
    const initializeWebContainer = async () => {
      let instance;
      try {
        instance = await WebContainer.boot();
      } catch (error) {
        console.error("Failed to boot WebContainer:", error);
        setBootError(
          "Sandbox failed to start. This usually means the page isn't cross-origin isolated (missing COOP/COEP headers).",
        );
        return;
      }
      if (!instance) {
        console.error("Failed to boot WebContainer");
        setBootError("Sandbox failed to start.");
        return;
      }
      containerRef.current = instance;
      const res = await fetch(`${API_URL}/repo-zip`);
      const blob = await res.blob();
      console.log("Fetched repo zip:", blob);
      const files: Record<string, any> =
        await convertRepoToWebContainerFS(blob);
      delete files["pnpm-lock.yaml"];
      delete files[".gitignore"];
      setTemplate({ ...files });
      await instance.mount({ ...files });

      const installProcess = await instance.spawn("npm", ["install"]);

      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log("INSTALL:", data);
          },
        }),
      );

      const exitCode = await installProcess.exit;
      console.log("INSTALL EXIT CODE:", exitCode);

      const lsProcess = await instance.spawn("ls");
      lsProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log("LS:", data);
          },
        }),
      );

      const devProcess = await instance.spawn("npm", ["run", "dev"]);
      devProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data);
          },
        }),
      );

      instance.on("server-ready", (port, url) => {
        console.log(`Server is ready on port ${port} at URL: ${url}`);
        setUrl(url);
      });
    };
    if (!containerRef.current) {
      initializeWebContainer();
    }
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col bg-linear-to-br from-background via-background to-primary/3">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/50 text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">AI Builder</span>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] ${
            bootError
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-border bg-muted/40 text-muted-foreground"
          }`}
          title={bootError ?? undefined}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              bootError
                ? "bg-destructive"
                : url
                  ? "bg-emerald-500"
                  : "animate-pulse bg-amber-500"
            }`}
          />
          {bootError ? "Sandbox failed to start" : url ? "Preview live" : "Booting sandbox"}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-6 p-6">
        <div className="w-[25%] min-w-70">
          <ChatBox
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleStream}
            plan={plan}
            liveFiles={touchedFiles}
            isStreaming={isStreaming}
          />
        </div>
        <div className="min-w-0 flex-1">
          <Tabs defaultValue="code" className="h-full w-full gap-3">
            <TabsList variant="line" className="border-b border-border">
              <TabsTrigger value="code" className="gap-1.5">
                <Code2 className="h-3.5 w-3.5" />
                Code
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code">
              <div className="flex h-150 overflow-hidden rounded-xl border border-border bg-card/40">
                <div className="w-60 shrink-0 overflow-y-auto border-r border-border p-2">
                  <FileExplorer
                    files={liveFilesToFileTree(liveFiles)}
                    onSelect={handleSelectFile}
                    selectedPath={activeFile ? (activeFile as IActiveFile).path : null}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  {activeFile && (
                    <div className="flex items-center gap-1.5 border-b border-border bg-muted/30 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                      {activeFile.path}
                    </div>
                  )}
                  <div className="flex-1">
                    {activeFile && (
                      <CodeEditor
                        code={activeFile.content}
                        language={activeFile.language}
                      />
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <Preview url={url} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
