import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "../primitives";
import { Reveal, useInView } from "../Reveal";

const transformation = [
  { label: "Problem", body: "Split an array into k parts, minimising the largest part sum." },
  { label: "Formalise", body: "minimise  max₁≤j≤k  Σ_{i∈Pⱼ} aᵢ   subject to  ⋃Pⱼ = A" },
  { label: "Simplify", body: "feasible(x) is monotone in x → the answer space is sorted" },
  { label: "Algorithmic form", body: "binary search x ∈ [max aᵢ, Σ aᵢ] · check feasible(x) greedily" },
];

export function Mathematics() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <Section id="mathematics" labelledBy="math-title">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <SectionHeading
          index="03"
          label="Mathematics"
          id="math-title"
          className="self-start lg:sticky lg:top-28"
          title={
            <>
               Taught mathematics, so the <span className="text-logic">reasoning</span> holds
              before the code does.
            </>
          }
          description="ChatKode has been specifically taught mathematics to improve how it works with mathematical problems and complex algorithms. In practice that means a problem is turned into something you can argue about — bounds, monotonicity, recurrences — before an implementation is proposed."
        />

        <div ref={ref} className="space-y-4">
          {transformation.map((row, i) => (
            <div
              key={row.label}
              style={{ transitionDelay: `${i * 150}ms` }}
              className={cn(
                "panel math-step group relative rounded-lg p-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-logic/35 motion-reduce:transition-none",
                inView
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-4 opacity-0 blur-[6px] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="label-mono text-[0.6rem] text-logic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label-mono">{row.label}</span>
              </div>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  i === 0
                    ? "text-sm text-muted-foreground"
                    : "overflow-x-auto font-mono text-[0.82rem] text-foreground/90",
                )}
              >
                {row.body}
              </p>
              {i < transformation.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -bottom-4 left-8 font-mono text-xs text-muted-foreground/60"
                >
                  ↓
                </span>
              )}
            </div>
          ))}

          <Reveal delay={120}>
            <div className="panel mt-8 rounded-lg p-5">
              <p className="label-mono text-[0.6rem]">Worked notation</p>
              <div className="mt-4 grid gap-4 font-mono text-[0.8rem] text-foreground/85 sm:grid-cols-2">
                <p>T(n) = 2·T(n/2) + O(n) ⇒ T(n) = O(n log n)</p>
                <p>Σᵢ₌₁ⁿ i = n(n+1)/2</p>
                <p>gcd(a, b) = gcd(b, a mod b)</p>
                <p>|A ∪ B| = |A| + |B| − |A ∩ B|</p>
              </div>
              <MiniPlot />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function MiniPlot() {
  return (
    <figure className="mt-6">
      <svg
        viewBox="0 0 320 90"
        className="h-24 w-full text-logic"
        role="img"
        aria-label="Growth comparison of linear, n log n and quadratic curves"
      >
        <g stroke="currentColor" strokeOpacity="0.12">
          {[0, 22.5, 45, 67.5, 90].map((y) => (
            <line key={y} x1="0" x2="320" y1={y} y2={y} />
          ))}
        </g>
        <path
          d="M0 88 L320 44"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.2"
        />
        <path
          d="M0 88 C110 78, 200 52, 320 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="420"
          strokeDashoffset="420"
           className="math-curve"
        />
        <path
          d="M0 88 C150 86, 235 60, 300 2"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.65rem] text-muted-foreground">
        <span className="text-muted-foreground">— O(n)</span>
        <span className="text-logic">— O(n log n)</span>
        <span className="text-primary">-- O(n²)</span>
      </figcaption>
    </figure>
  );
}
