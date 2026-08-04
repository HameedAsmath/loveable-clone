import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Loader2, RefreshCw } from "lucide-react";

function Preview({ url }: { url: string | null }) {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className="flex h-150 flex-col overflow-hidden rounded-xl border border-border bg-card/40">
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="mx-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-background/70 px-2.5 py-1 text-xs text-muted-foreground">
          <Globe className="h-3 w-3 shrink-0" />
          <span className="truncate">{url ?? "Waiting for dev server..."}</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={!url}
          onClick={() => setReloadKey((k) => k + 1)}
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon-sm" disabled={!url} asChild={!!url}>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <ExternalLink className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <div className="relative flex-1 bg-background">
        {url ? (
          <iframe
            key={reloadKey}
            id="preview"
            title="WebContainer Preview"
            className="h-full w-full border-none"
            src={url}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-xs">Booting your dev environment...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
