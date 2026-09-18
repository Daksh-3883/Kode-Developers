import { Section } from "../primitives";
import { Reveal } from "../Reveal";
import { CodePanel } from "../CodePanel";

const terminal = [
  { p: "$", t: "chatkode explain --file scheduler.rs --focus complexity", c: "cmd" },
  { p: ">", t: "reading scheduler.rs · 214 lines", c: "dim" },
  { p: ">", t: "hot path: fn assign() — nested loop over tasks × workers", c: "dim" },
  { p: ">", t: "current: O(t · w) · suggested: bucket by deadline → O(t log t)", c: "ok" },
  { p: "$", t: "chatkode derive --from 'minimise max load' --target algorithm", c: "cmd" },
  { p: ">", t: "monotone predicate found · binary search on answer", c: "ok" },
];

export function Developers() {
  return (
    <Section id="developers" tone="raised" labelledBy="dev-title">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="label-mono text-primary">06</span>
            <span className="h-px w-6 bg-border-strong" aria-hidden />
            <span className="label-mono">Developer experience</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="dev-title"
              className="mt-6 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[3rem]"
            >
              Made for the hours between{" "}
              <span className="text-primary">a hard problem</span> and a working build.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Technical vocabulary, precise output, no filler. ChatKode is designed to sit next to
              the work you were already doing — reading code, sketching an approach, checking
              whether an idea survives its own edge cases.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {[
                ["Precise register", "Answers in complexity and invariants."],
                ["Edge-case pressure", "Failure modes named, not skipped."],
                ["Multi-language", "Reads and writes across common stacks."],
                ["Explain mode", "Walks the reasoning, not only the result."],
              ].map(([t, b]) => (
                <li
                  key={t}
                  className="group bg-background p-5 transition-colors duration-300 hover:bg-surface-raised"
                >
                  <p className="font-mono text-xs text-foreground transition-colors group-hover:text-primary">
                    {t}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160} className="space-y-4">
          <div className="panel overflow-hidden rounded-lg">
            <div className="flex items-center justify-between border-b border-border bg-surface-raised/60 px-4 py-2">
              <span className="font-mono text-xs text-foreground/80">chatkode — zsh</span>
              <span className="label-mono text-[0.6rem]">session</span>
            </div>
            <div className="overflow-x-auto px-4 py-4 font-mono text-[0.78rem] leading-[1.9]">
              {terminal.map((l, i) => (
                <div key={i} className="flex gap-2 whitespace-pre">
                  <span className={l.c === "cmd" ? "text-primary" : "text-syn-com"}>{l.p}</span>
                  <span
                    className={
                      l.c === "cmd"
                        ? "text-foreground"
                        : l.c === "ok"
                          ? "text-syn-str"
                          : "text-muted-foreground"
                    }
                  >
                    {l.t}
                  </span>
                </div>
              ))}
              <div className="flex gap-2">
                <span className="text-primary">$</span>
                <span className="caret" aria-hidden />
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-border px-4 py-2.5 font-mono text-[0.65rem] text-muted-foreground">
              <span className="text-primary">● ready</span>
              <span>utf-8</span>
              <span>ln 6, col 1</span>
              <span className="hidden sm:inline">interface shown for illustration</span>
            </div>
          </div>

          <CodePanel
            title="review.diff"
            meta="suggestion"
            lines={[
              [{ t: "- for w in workers { for t in tasks { assign(w, t) } }", c: "com" }],
              [
                { t: "+ " },
                { t: "let", c: "key" },
                { t: " " },
                { t: "mut", c: "key" },
                { t: " heap = BinaryHeap::" },
                { t: "new", c: "fn" },
                { t: "();" },
              ],
              [
                { t: "+ " },
                { t: "for", c: "key" },
                { t: " t " },
                { t: "in", c: "key" },
                { t: " tasks.iter().sorted_by_key(|t| t.deadline) {" },
              ],
              [{ t: "+     heap.push(Reverse(load));  " }, { t: "// O(t log t)", c: "com" }],
              [{ t: "+ }" }],
            ]}
          />
        </Reveal>
      </div>
    </Section>
  );
}
