import { cn } from "@/lib/utils";
import { pipeline } from "@/content/site";
import { Section, SectionHeading } from "../primitives";
import { Reveal, useInView } from "../Reveal";

export function Pipeline() {
  const { ref, inView } = useInView<HTMLOListElement>({ threshold: 0.15 });

  return (
    <Section id="capabilities" tone="raised" labelledBy="pipeline-title">
      <SectionHeading
        index="02"
        label="Built for complex problems"
        id="pipeline-title"
        title={
          <>
            A problem does not become code in one step. It goes through{" "}
            <span className="text-primary">a pipeline</span>.
          </>
        }
        description="ChatKode works the way an engineer works: understand, formalise, choose a method, then implement. Each stage is visible, so you can disagree with it."
      />

      <ol ref={ref} className="relative mt-16 space-y-0">
        <span
          aria-hidden
          className={cn(
            "pipeline-rail absolute top-2 bottom-2 left-[1.15rem] w-px origin-top transition-transform duration-[1800ms] ease-out sm:left-[1.4rem]",
            inView ? "scale-y-100" : "scale-y-0",
          )}
        />
        {pipeline.map((stage, i) => (
          <li
            key={stage.step}
            style={{ transitionDelay: `${i * 130}ms` }}
            className={cn(
              "relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-8 motion-reduce:transition-none",
              inView
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-4 opacity-0 blur-[6px] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0",
            )}
          >
            <div className="relative flex justify-center">
              <span
                className={cn(
                  "pipeline-node z-10 mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-background font-mono text-[0.7rem] transition-[color,border-color,box-shadow] duration-500",
                  inView
                    ? i === pipeline.length - 1
                      ? "border-success/60 text-success shadow-brand-green"
                      : i === 2
                        ? "border-logic/60 text-logic shadow-brand-gold"
                        : "border-signal/50 text-signal"
                    : "border-border text-muted-foreground",
                )}
              >
                {stage.step}
              </span>
            </div>
            <div className="min-w-0 border-b border-border pb-6">
              <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {stage.label}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {stage.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Reveal delay={120} className="mt-10">
        <p className="label-mono">
          Pipeline is illustrative of how responses are structured — not a guarantee of output.
        </p>
      </Reveal>
    </Section>
  );
}
