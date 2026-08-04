import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  CheckCircle2,
  FileCode2,
  Loader2,
  Sparkles,
  Wand2,
} from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [plan, liveFiles.length]);

  const canSubmit = prompt.trim().length > 0 && !isStreaming;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(prompt);
  };

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 text-primary-foreground shadow-sm">
          <Wand2 className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold leading-none">Builder Chat</h2>
          <p className="mt-1 truncate text-[11px] text-muted-foreground">
            Describe a change and watch it build live
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1"
      >
        {!plan && !isStreaming && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 px-4 py-10 text-center">
            <Sparkles className="h-5 w-5 text-muted-foreground/40" />
            <p className="max-w-[220px] text-xs text-muted-foreground">
              Your plan and generated files will appear here once you send a
              message.
            </p>
          </div>
        )}

        {(plan || isStreaming) && (
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border p-3 transition-colors duration-300",
              isStreaming
                ? "border-primary/30 bg-primary/5 shimmer-sweep"
                : "border-border bg-muted/30",
            )}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full transition-colors",
                  isStreaming ? "bg-primary/15" : "bg-muted",
                )}
              >
                <Sparkles
                  className={cn(
                    "h-3 w-3",
                    isStreaming ? "text-primary animate-pulse" : "text-muted-foreground",
                  )}
                />
              </span>
              <p className="text-xs font-semibold tracking-wide text-foreground/80">
                {isStreaming && !plan ? "Thinking" : "Plan"}
              </p>
              {isStreaming && (
                <span className="ml-auto flex items-center gap-0.5">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-primary/60" />
                </span>
              )}
            </div>

            {plan && (
              <p className="relative whitespace-pre-wrap text-xs leading-relaxed text-foreground/90">
                {plan}
                {isStreaming && (
                  <span className="animate-blink-cursor -mb-0.5 ml-0.5 inline-block h-3 w-1.5 align-middle bg-primary/70" />
                )}
              </p>
            )}
          </div>
        )}

        {liveFiles.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
              <FileCode2 className="h-3.5 w-3.5" />
              Files
              <span className="font-normal text-muted-foreground">
                ({liveFiles.length})
              </span>
            </p>
            <div className="flex flex-col gap-0.5">
              {liveFiles.map((file, index) => {
                const isCurrentlyStreaming =
                  isStreaming && index === liveFiles.length - 1;
                return (
                  <div
                    key={file.path}
                    className="group flex animate-in items-center gap-2 rounded-md px-2 py-1 fade-in slide-in-from-left-1 duration-300"
                    style={{ animationDelay: `${Math.min(index, 20) * 25}ms` }}
                  >
                    {isCurrentlyStreaming ? (
                      <Loader2 className="h-3 w-3 shrink-0 animate-spin text-primary" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                    )}
                    <span className="truncate font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                      {file.path}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="relative">
        <Textarea
          placeholder="Describe what you want to build or change..."
          rows={3}
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="min-h-[88px] resize-none rounded-xl border-border/80 bg-background/70 pr-12 shadow-sm transition-shadow focus-visible:shadow-md"
        />
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="icon"
          className="absolute bottom-2.5 right-2.5 h-8 w-8 rounded-lg shadow-sm"
        >
          {isStreaming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
