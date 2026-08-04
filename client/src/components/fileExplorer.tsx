import { cn } from "@/lib/utils";
import { File, FileJson, FileCode, Folder, Palette } from "lucide-react";

function getFileIcon(name: string) {
  const ext = name.split(".").pop();
  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
      return <FileCode className="h-3.5 w-3.5 text-sky-500" />;
    case "json":
      return <FileJson className="h-3.5 w-3.5 text-amber-500" />;
    case "css":
      return <Palette className="h-3.5 w-3.5 text-violet-500" />;
    default:
      return <File className="h-3.5 w-3.5 text-muted-foreground" />;
  }
}

interface IFileExplorer {
  files: any;
  onSelect: (file: any) => void;
  selectedPath?: string | null;
  level?: number;
}

export default function FileExplorer({
  files,
  onSelect,
  selectedPath,
  level = 0,
}: IFileExplorer) {
  return (
    <div className="flex flex-col gap-0.5 text-sm">
      {files.map((file: any) => (
        <div key={file.path}>
          {file.type === "folder" ? (
            <div>
              <div
                className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-medium text-foreground/70"
                style={{ paddingLeft: `${level * 12 + 6}px` }}
              >
                <Folder className="h-3.5 w-3.5 text-primary/60" />
                {file.name}
              </div>

              {file.children && (
                <FileExplorer
                  files={file.children}
                  onSelect={onSelect}
                  selectedPath={selectedPath}
                  level={level + 1}
                />
              )}
            </div>
          ) : (
            <div
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-xs transition-colors",
                selectedPath === file.path
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              style={{ paddingLeft: `${level * 12 + 20}px` }}
              onClick={() => onSelect(file)}
            >
              {getFileIcon(file.name)}
              <span className="truncate">{file.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
