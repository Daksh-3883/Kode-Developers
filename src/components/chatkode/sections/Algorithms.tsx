import { useState } from "react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "../primitives";
import { useInView } from "../Reveal";

type Node = { id: string; x: number; y: number; label: string; note: string };

const nodes: Node[] = [
  { id: "in", x: 60, y: 100, label: "input", note: "raw sequence" },
  { id: "norm", x: 220, y: 46, label: "normalise", note: "bounds & types" },
  { id: "sort", x: 220, y: 154, label: "order", note: "O(n log n)" },
  { id: "scan", x: 390, y: 100, label: "scan", note: "single pass" },
  { id: "check", x: 550, y: 46, label: "verify", note: "invariant holds" },
  { id: "out", x: 550, y: 154, label: "output", note: "answer + proof" },
];

const edges: [string, string][] = [
  ["in", "norm"],
  ["in", "sort"],
  ["norm", "scan"],
  ["sort", "scan"],
  ["scan", "check"],
  ["scan", "out"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

function nodeColor(id: string) {
  if (id === "check") return "var(--color-logic)";
  if (id === "out") return "var(--color-success)";
  return "var(--color-signal)";
}

export function Algorithms() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section id="algorithms" labelledBy="algo-title">
      <SectionHeading
        index="05"
        label="Algorithms"
        id="algo-title"
        title={
          <>
            An algorithm is a <span className="text-primary">structure</span>, not a snippet.
          </>
        }
        description="Data enters, gets shaped, gets traversed, gets checked. ChatKode is oriented around naming those stages explicitly so the result can be reviewed like any other engineering artefact."
      />

      <div ref={ref} className="panel mt-14 min-w-0 max-w-full overflow-x-auto rounded-lg p-4 sm:p-8">
        <svg
          viewBox="0 0 640 200"
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label="Diagram: input flows through normalise and order into a scan stage, producing verification and output"
        >
          {edges.map(([a, b], i) => {
            const from = byId[a];
            const to = byId[b];
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const dim = active !== null && active !== a && active !== b;
            return (
              <path
                key={`${a}-${b}`}
                d={`M ${from.x + 34} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x - 34} ${to.y}`}
                fill="none"
                stroke={dim ? "var(--color-border-strong)" : nodeColor(b)}
                strokeOpacity={dim ? 0.35 : 0.55}
                strokeWidth="1.25"
                strokeDasharray="300"
                strokeDashoffset={inView ? undefined : 300}
                style={
                  inView
                    ? { animation: `ck-dash 900ms ${180 + i * 130}ms ease-out forwards` }
                    : undefined
                }
                className="algorithm-edge transition-[stroke,stroke-opacity] duration-300"
              />
            );
          })}

          {nodes.map((n, i) => {
            const dim = active !== null && active !== n.id;
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.label}: ${n.note}`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className={cn(
                  "cursor-default transition-[opacity,transform] duration-500 ease-out outline-none motion-reduce:transition-none",
                  inView ? "opacity-100" : "opacity-0",
                )}
                style={{ transitionDelay: `${i * 110}ms`, opacity: dim ? 0.5 : undefined }}
              >
                <rect
                  x={n.x - 46}
                  y={n.y - 20}
                  width="92"
                  height="40"
                  rx="4"
                  fill="var(--color-surface-raised)"
                  stroke={active === n.id ? nodeColor(n.id) : "var(--color-border-strong)"}
                  className="algorithm-node transition-[stroke,filter] duration-300"
                />
                <text
                  x={n.x}
                  y={n.y - 2}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-foreground)"
                >
                  {n.label}
                </text>
                <text
                  x={n.x}
                  y={n.y + 12}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-muted-foreground)"
                >
                  {n.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
        {[
          ["Deterministic shape", "Same stages, whatever the problem size."],
          ["Stated complexity", "Cost named alongside the method."],
          ["Reviewable", "Every stage can be challenged on its own."],
        ].map(([t, b]) => (
          <li key={t} className="bg-background p-5 transition-colors duration-300 hover:bg-surface">
            <p className="font-mono text-xs text-foreground">{t}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
