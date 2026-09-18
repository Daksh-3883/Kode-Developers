import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Token = { t: string; c?: "key" | "fn" | "str" | "num" | "com" | "var" | "punc" };
export type CodeLine = Token[];

const tokenClass: Record<NonNullable<Token["c"]>, string> = {
  key: "text-syn-key",
  fn: "text-syn-fn",
  str: "text-syn-str",
  num: "text-syn-num",
  com: "text-syn-com italic",
  var: "text-syn-var",
  punc: "text-muted-foreground",
};

export function CodePanel({
  title,
  meta,
  lines,
  tabs,
  activeTab,
  onTabChange,
  visibleLines,
  showCaret,
  highlightLine,
  className,
  footer,
}: {
  title: string;
  meta?: string;
  lines: CodeLine[];
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  visibleLines?: number;
  showCaret?: boolean;
  highlightLine?: number | undefined;
  className?: string;
  footer?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const shown = visibleLines ?? lines.length;

  const plain = lines.map((l) => l.map((t) => t.t).join("")).join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "panel code-panel group/panel min-w-0 max-w-full overflow-hidden rounded-lg transition-[border-color,box-shadow,transform] duration-300 focus-within:border-signal/50 hover:border-signal/25 hover:shadow-brand-cyan",
        className,
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface-raised/60 px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden />
          <span className="truncate font-mono text-xs text-foreground/80">{title}</span>
          {meta && (
            <span className="hidden truncate font-mono text-[0.68rem] text-muted-foreground sm:inline">
              {meta}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded border border-border px-2 py-1 font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase transition-colors hover:border-signal/60 hover:bg-signal-soft hover:text-signal"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>

      {tabs && tabs.length > 0 && (
        <div
          role="tablist"
          aria-label="Language"
          className="flex gap-1 overflow-x-auto border-b border-border px-2 py-1.5"
        >
          {tabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => onTabChange?.(tab)}
                className={cn(
                  "relative rounded px-3 py-1.5 font-mono text-xs whitespace-nowrap transition-colors duration-200",
                  active
                    ? "bg-surface-raised text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-2 -bottom-px h-px origin-left bg-primary transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="overflow-x-auto">
        <pre className="min-w-max px-3 py-4 font-mono text-[0.78rem] leading-[1.75] sm:px-5 sm:text-[0.82rem]">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={cn(
                    "code-line grid grid-cols-[2.25rem_minmax(0,1fr)] transition-[opacity,transform,background-color,border-color] duration-500",
                    i < shown ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
                    highlightLine === i && "border-l border-signal bg-signal-soft",
                )}
              >
                <span className="pr-4 text-right text-syn-com select-none">{i + 1}</span>
                <span className="whitespace-pre text-syn-var">
                  {line.map((tok, j) => (
                    <span key={j} className={tok.c ? tokenClass[tok.c] : undefined}>
                      {tok.t}
                    </span>
                  ))}
                  {showCaret && i === shown - 1 && <span className="caret ml-0.5" aria-hidden />}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {footer && (
        <div className="border-t border-border bg-surface-raised/40 px-4 py-2.5 font-mono text-[0.68rem] text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}
