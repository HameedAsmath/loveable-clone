import Editor from "@monaco-editor/react"

interface ICodeEditor {
  code: string;
  language: string;
}

export default function CodeEditor({ code, language }: ICodeEditor) {
  return (
    <Editor
      height="100vh"
      theme="vs-dark"
      language={language}
      value={code}
      options={{
        fontSize: 14,
        minimap: { enabled: true }
      }}
    />
  )
}