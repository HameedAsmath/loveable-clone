interface IFileExplorer {
  files: any;
  onSelect: (file: any) => void;
  level?: number;
}
export default function FileExplorer({ files, onSelect, level = 0 }: IFileExplorer) {
  return (
    <div className="text-sm">
      {files.map((file: any, index: number) => (
        <div key={index}>
          {file.type === "folder" ? (
            <div>
              <div
                className="font-semibold"
                style={{ paddingLeft: `${level * 12}px` }}
              >
                📁 {file.name}
              </div>

              {file.children && (
                <FileExplorer
                  files={file.children}
                  onSelect={onSelect}
                  level={level + 1}
                />
              )}
            </div>
          ) : (
            <div
              className="cursor-pointer hover:bg-muted"
              style={{ paddingLeft: `${level * 12 + 12}px` }}
              onClick={() => onSelect(file)}
            >
              📄 {file.name}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}