import { Reveal } from "../Reveal";
import { Section } from "../primitives";

export function WhatIs() {
  return (
    <Section id="product" labelledBy="what-is-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="label-mono text-primary">01</span>
            <span className="h-px w-6 bg-border-strong" aria-hidden />
            <span className="label-mono">What is ChatKode</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="what-is-title"
              className="mt-6 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[3.1rem]"
            >
              Not a chatbot that happens to write code. A tool built around{" "}
              <span className="text-primary">how engineers think</span>.
            </h2>
          </Reveal>
          <Reveal delay={160} className="mt-10 hidden lg:block">
            <TechComposition />
          </Reveal>
        </div>

        <div className="space-y-7 self-center">
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Most conversational assistants treat a programming question like any other question:
              produce fluent text, stop. ChatKode is built for the part that comes before the
              text — reading the constraints, choosing a representation, and committing to an
              approach that can be defended.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-base leading-relaxed text-muted-foreground">
              It was made by <span className="text-foreground">Kode Developers</span> for
              developers, programmers and technically minded people who care whether a solution is{" "}
              <span className="text-foreground">correct</span>, not only whether it{" "}
              <span className="text-foreground">compiles</span>.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-2 divide-y divide-border border-y border-border">
              {[
                ["Reasoning first", "Constraints and structure before syntax."],
                ["Mathematically taught", "Trained on mathematics to sharpen formal reasoning."],
                ["Algorithmic bias", "Prefers a stated method over a guessed snippet."],
                ["Engineering register", "Speaks in complexity, invariants and trade-offs."],
              ].map(([title, body]) => (
                <li key={title} className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
                  <span className="font-mono text-xs tracking-wide text-foreground">{title}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{body}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={300} className="lg:hidden">
            <TechComposition />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function TechComposition() {
  return (
    <div className="panel relative overflow-hidden rounded-lg p-6">
      <div className="grid-atmosphere absolute inset-0 opacity-40" aria-hidden />
      <div className="relative space-y-3 font-mono text-xs">
        <p className="label-mono text-[0.6rem]">Response shape</p>
        {[
          ["constraints", "n ≤ 10⁵ · values ≤ 10⁹ · time 1s"],
          ["representation", "sorted array + two pointers"],
          ["complexity", "time O(n log n) · space O(1)"],
          ["risk", "overflow on sum → use 64-bit"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-3 break-words sm:grid-cols-[7.5rem_minmax(0,1fr)]"
          >
            <span className="text-syn-com">{k}</span>
            <span className={i === 3 ? "text-accent" : "text-foreground/85"}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
