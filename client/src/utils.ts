import type { WebContainer } from "@webcontainer/api";
import type { ILiveFile } from "./App";
import JSZip from "jszip";


type FileTreeNode = {
  name: string;
  type: "file" | "folder";
  language?: string;
  content?: string;
  children?: FileTreeNode[];
};

type TemplateNode =
  | { file: { contents: string } }
  | { directory: Record<string, TemplateNode> };

function getLanguage(filename: string): string | undefined {
  const ext = filename.split(".").pop();
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
  };
  return ext ? map[ext] : undefined;
}

export function liveFilesToFileTree(files: ILiveFile[]): FileTreeNode[] {
  const root: Record<string, FileTreeNode> = {};

  for (const { path, content } of files) {
    const parts = path.replace(/^\//, "").split("/"); // "/src/App.jsx" → ["src", "App.jsx"]
    insertIntoTree(root, parts, content);
  }

  return Object.values(root);
}

function insertIntoTree(
  node: Record<string, FileTreeNode>,
  parts: string[],
  content: string
): void {
  const [head, ...rest] = parts;

  if (rest.length === 0) {
    // It's a file
    node[head] = {
      name: head,
      type: "file",
      language: getLanguage(head.split(".").pop() || ""),
      content,
    };
  } else {
    // It's a folder — create if missing
    if (!node[head]) {
      node[head] = { name: head, type: "folder", children: [] };
    }

    // Convert children array → map for easy lookup, recurse, convert back
    const childMap = Object.fromEntries(
      (node[head].children || []).map((c) => [c.name, c])
    );
    insertIntoTree(childMap, rest, content);
    node[head].children = Object.values(childMap);
  }
}

export function templateToLiveFiles(
  template: Record<string, TemplateNode>,
  parentPath = ""
): { path: string; content: string }[] {
  const result: { path: string; content: string }[] = [];

  for (const [name, node] of Object.entries(template)) {
    const currentPath = `${parentPath}/${name}`;

    if ("file" in node) {
      result.push({ path: currentPath, content: node.file.contents });
    } else {
      // folder — recurse into directory
      result.push(...templateToLiveFiles(node.directory, currentPath));
    }
  }

  return result;
}

export async function ensureDir(container: WebContainer, filePath: string) {
  const parts = filePath.split("/").filter(Boolean); // "/src/components/TodoItem.jsx" → ["src", "components", "TodoItem.jsx"]
  parts.pop(); // remove the filename, we only want dirs → ["src", "components"]

  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    try {
      await container.fs.mkdir(current);
    } catch {
      // directory already exists — ignore
    }
  }
}

export async function convertRepoToWebContainerFS(blob:Blob) {
  const zip = await JSZip.loadAsync(blob);
  const files = {};

  for (const [path, file] of Object.entries(zip.files)) {
    if (file.dir) continue;

    const content = await file.async("string");

    // remove top-level folder (github adds it)
    const cleanPath = path.split("/").slice(1).join("/");

    if (!cleanPath) continue;

    setNestedFile(files, cleanPath, content);
  }

  return files;
}

export function setNestedFile(obj: any, path: string, content: string) {
  const parts = path.split("/");
  let current = obj;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i === parts.length - 1) {
      // file
      current[part] = {
        file: { contents: content },
      };
    } else {
      // directory
      if (!current[part]) {
        current[part] = { directory: {} };
      }
      current = current[part].directory;
    }
  }
}