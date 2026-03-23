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

interface IActiveFile {
  language: string;
  content: string;
}
export interface ILiveFile {
  path: string;
  content: string;
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [activeFile, setActiveFile] = useState<IActiveFile | null>(null);
  const [template, setTemplate] = useState<Record<string, any> | null>(null);
  const [history, setHistory] = useState<
    { role: "user" | "assistant"; feedback: string }[]
  >([]);

  const [plan, setPlan] = useState<string>("");
  const [liveFiles, setLiveFiles] = useState<ILiveFile[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

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

      const response = await fetch("http://localhost:3000/edit-code", {
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
    const live = liveFiles.find((f) => f.path.endsWith(file.content)); // fallback to passed file
    setActiveFile(
      live ? { language: file.language, content: live.content } : file,
    );
  };

    useEffect(() => {
    if (liveFiles.length > 0 && !activeFile) {
      const appFile = liveFiles.find((f) => f.path.endsWith("/src/App.tsx"));
      if (appFile) {
        setActiveFile({ language: "typescript", content: appFile.content });
      }
    }
  }, [liveFiles]);

  useEffect(() => {
    const initializeWebContainer = async () => {
      const instance = await WebContainer.boot();
      if (!instance) {
        console.error("Failed to boot WebContainer");
        return;
      }
      containerRef.current = instance;
      const res = await fetch("http://localhost:3000/repo-zip");
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
    <div className="app flex h-screen w-screen gap-8 p-8">
      <div className="chatbox w-[25%]">
        <ChatBox
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleStream}
          plan={plan}
          liveFiles={liveFiles}
          isStreaming={isStreaming}
        />
      </div>
      <div className="right-pane w-[75%]">
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-[20%] grid-cols-2">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <div className="flex h-[600px]">
              <div className="w-60 border-r p-2">
                <FileExplorer
                  files={liveFilesToFileTree(liveFiles)}
                  onSelect={handleSelectFile}
                />
              </div>

              <div className="flex-1">
                {activeFile && (
                  <CodeEditor
                    code={activeFile.content}
                    language={activeFile.language}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Preview url={url} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
