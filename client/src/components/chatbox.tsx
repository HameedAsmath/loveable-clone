import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ILiveFile } from "../App";

const ChatBox = ({
  prompt,
  setPrompt,
  onSubmit,
  plan,
  liveFiles,
  isStreaming, 
}: {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (prompt: string) => void;
  plan: string;
  liveFiles: ILiveFile[];
  isStreaming: boolean;
}) => {

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">Chat Box</h2>

      <Textarea
        placeholder="Type your message here..."
        rows={5}
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
      />

      <Button onClick={() => onSubmit(prompt)} disabled={isStreaming}>
        {isStreaming ? "Generating..." : "Send"}
      </Button>

      {/* NEW: show plan as it streams in */}
      {plan && (
        <div className="text-xs text-muted-foreground border rounded p-2">
          <p className="font-semibold mb-1">Plan</p>
          <p>{plan}</p>
        </div>
      )}

      {/* NEW: show files being created one by one */}
      {liveFiles.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Files</p>
          {liveFiles.map((file, index) => {
            // last file is the one currently streaming
            const isCurrentlyStreaming = isStreaming && index === liveFiles.length - 1;
            return (
              <div key={file.path} className="flex items-center gap-2 text-xs">
                <span>{isCurrentlyStreaming ? "⏳" : "✅"}</span>
                <span className="font-mono">{file.path}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
