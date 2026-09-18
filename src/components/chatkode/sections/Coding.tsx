import { useState } from "react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "../primitives";
import { CodePanel } from "../CodePanel";
import { Reveal, useInView } from "../Reveal";
import { codeTabs, implementations, type CodeTab } from "@/content/site";

const reasoning = [
  "Answer is monotone: if capacity x works, x+1 works.",
  "So search over the answer, not the partitions.",
  "Lower bound = max(weights); upper bound = sum(weights).",
  "feasible(x): sweep once, open a new day when the load exceeds x.",
];

export function Coding() {
  const [tab, setTab] = useState<CodeTab>("Python");
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Section id="coding" tone="raised" labelledBy="coding-title">
      <SectionHeading
        index="04"
        label="Coding"
        id="coding-title"
        title={
          <>
            From a stated problem to an implementation you can{" "}
            <span className="text-primary">read line by line</span>.
          </>
        }
        description="The same problem, carried across three panels: what was asked, how it was reasoned about, and what it became. Language tabs are a demonstration of the surface, not a claim about tooling."
      />

      <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-[0.85fr_0.9fr_1.25fr]">
        <div
          className={cn(
            "panel rounded-lg p-5 transition-all duration-700 ease-out motion-reduce:transition-none",
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <p className="label-mono text-[0.6rem]">Problem</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90">
            Packages must ship within <span className="font-mono text-primary">d</span> days, in
            order. Find the smallest daily capacity that still meets the deadline.
          </p>
          <dl className="mt-6 space-y-2 font-mono text-[0.72rem] text-muted-foreground">
            <div className="flex justify-between gap-3">
              <dt>input</dt>
              <dd className="text-foreground/80">weights[], d</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>output</dt>
              <dd className="text-foreground/80">min capacity</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>order</dt>
              <dd className="text-foreground/80">preserved</dd>
            </div>
          </dl>
        </div>

        <div
          style={{ transitionDelay: "150ms" }}
          className={cn(
            "panel rounded-lg p-5 transition-all duration-700 ease-out motion-reduce:transition-none",
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <p className="label-mono text-[0.6rem]">Reasoning</p>
          <ol className="mt-4 space-y-3">
            {reasoning.map((r, i) => (
              <li
                key={r}
                style={{ transitionDelay: `${300 + i * 140}ms` }}
                className={cn(
                  "grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed text-muted-foreground transition-all duration-600 ease-out motion-reduce:transition-none",
                  inView ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                )}
              >
                <span className="font-mono text-[0.7rem] text-primary">{i + 1}.</span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-border pt-4 font-mono text-[0.72rem] text-accent">
            complexity: O(n log Σaᵢ)
          </p>
        </div>

        <div
          style={{ transitionDelay: "260ms" }}
          className={cn(
            "transition-all duration-700 ease-out motion-reduce:transition-none",
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <CodePanel
            title="min_capacity"
            meta="implementation"
            tabs={[...codeTabs]}
            activeTab={tab}
            onTabChange={(t) => setTab(t as CodeTab)}
            lines={implementations[tab]}
            footer="Illustrative code shown for demonstration."
          />
        </div>
      </div>

      <Reveal delay={100} className="mt-6">
        <p className="label-mono">Panels scroll horizontally on small screens.</p>
      </Reveal>
    </Section>
  );
}
