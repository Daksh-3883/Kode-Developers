import { cn } from "@/lib/utils";
import { Reveal, useInView } from "../Reveal";
import { Section, SectionHeading, Wordmark } from "../primitives";

const principles = [
  {
    number: "01",
    title: "Human first",
    body: "AI should amplify human capability, not replace human agency.",
    accent: "text-primary",
  },
  {
    number: "02",
    title: "Know your limits",
    body: "Being capable of something does not make every use appropriate.",
    accent: "text-logic",
  },
  {
    number: "03",
    title: "Help, don’t control",
    body: "ChatKode exists to assist the person using it, not to make itself the authority.",
    accent: "text-signal",
  },
  {
    number: "04",
    title: "Use it responsibly",
    body: "AI is a tool. How that tool is used still matters.",
    accent: "text-success",
  },
];

export function HumanFirst() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.22 });

  return (
    <Section id="human-first" labelledBy="human-first-title">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
        <SectionHeading
          index="09"
          label="Human-first AI"
          id="human-first-title"
          className="self-start lg:sticky lg:top-28"
          title={
            <>
              Not just a capable AI. An AI with <span className="text-success">boundaries</span>.
            </>
          }
          description="We didn’t just build ChatKode to know how to help. We built it around the judgment that knowing how is not the same as deciding whether something should be done."
        />

        <div className="min-w-0 space-y-8">
          <Reveal>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              ChatKode is intended to help people build, learn, reason and solve problems. Its
              capability remains in service of the person using it — within appropriate safety,
              ethical and legal boundaries. It should assist human decisions, not become the
              authority behind them.
            </p>
          </Reveal>

          <div
            ref={ref}
            className="panel human-system relative overflow-hidden rounded-lg p-5 sm:p-7"
          >
            <div className="grid-atmosphere pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="relative">
              <p className="label-mono text-[0.6rem]">Human → AI → human</p>
              <div className="mt-7 grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)_5.5rem_minmax(0,1fr)] sm:gap-2">
                <SystemNode
                  eyebrow="Directs"
                  title="Human"
                  note="asks · sets intent"
                  active={inView}
                  tone="primary"
                />
                <Signal label="legitimate goal" active={inView} direction="forward" />
                <SystemNode
                  eyebrow="Works with"
                  title="ChatKode"
                  note="helps · reasons · builds"
                  active={inView}
                  tone="signal"
                  brand
                />
                <Signal label="assistance" active={inView} direction="return" />
                <SystemNode
                  eyebrow="Reviews"
                  title="Human decision"
                  note="checks · decides · uses"
                  active={inView}
                  tone="success"
                />
              </div>
              <p className="mt-6 text-center font-mono text-[0.65rem] leading-relaxed text-muted-foreground">
                The person remains responsible at both ends of the system.
              </p>
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {principles.map((principle, index) => (
              <li
                key={principle.title}
                className="group bg-background p-5 transition-colors duration-300 hover:bg-surface"
              >
                <Reveal delay={index * 70}>
                  <div className="flex items-center gap-3">
                    <span className={cn("font-mono text-[0.65rem]", principle.accent)}>
                      {principle.number}
                    </span>
                    <h3 className="font-mono text-xs font-medium text-foreground">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {principle.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="panel overflow-hidden rounded-lg">
              <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                <div className="p-5 sm:p-6">
                  <p className="label-mono text-[0.6rem] text-signal">Capable of</p>
                  <p className="mt-3 font-mono text-xs leading-7 text-foreground/90">
                    generating · reasoning · explaining · transforming · assisting
                  </p>
                </div>
                <div className="flex items-center justify-center border-y border-border px-5 py-3 md:border-x md:border-y-0">
                  <span className="font-display text-2xl font-semibold text-logic" aria-label="does not equal">
                    ≠
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="label-mono text-[0.6rem] text-logic">Authority to</p>
                  <p className="mt-3 font-mono text-xs leading-7 text-foreground/90">
                    decide for people · control people · override human agency
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="border-l-2 border-success pl-5 sm:pl-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Wordmark className="[&_img]:h-7" />
                <span className="label-mono text-[0.6rem]">by Kode Developers</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground">
                Kode Developers builds the tool. People decide how they use it.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                AI can make mistakes, and important outputs deserve review. Build with it. Think
                with it. Verify when it matters.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function SystemNode({
  eyebrow,
  title,
  note,
  active,
  tone,
  brand = false,
}: {
  eyebrow: string;
  title: string;
  note: string;
  active: boolean;
  tone: "primary" | "signal" | "success";
  brand?: boolean;
}) {
  const tones = {
    primary: "border-primary/45 shadow-brand-blue",
    signal: "border-signal/45 shadow-brand-cyan",
    success: "border-success/45 shadow-brand-green",
  } as const;

  return (
    <div
      className={cn(
        "human-node min-h-28 border bg-surface-raised/75 p-4 text-center transition-[opacity,transform,border-color,box-shadow] duration-700 motion-reduce:transition-none",
        active ? cn("translate-y-0 opacity-100", tones[tone]) : "translate-y-2 opacity-40",
      )}
    >
      <p className="label-mono text-[0.55rem]">{eyebrow}</p>
      {brand ? (
        <Wordmark className="mt-3 justify-center [&_img]:h-6 sm:[&_img]:h-7" />
      ) : (
        <p className="mt-2 font-display text-base font-semibold text-foreground">{title}</p>
      )}
      <p className="mt-2 font-mono text-[0.58rem] leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

function Signal({
  label,
  active,
  direction,
}: {
  label: string;
  active: boolean;
  direction: "forward" | "return";
}) {
  return (
    <div className="relative flex min-h-12 items-center justify-center sm:block sm:min-h-0">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-strong sm:left-0 sm:top-1/2 sm:h-px sm:w-full sm:translate-x-0 sm:-translate-y-1/2" aria-hidden />
      <span
        aria-hidden
        className={cn(
          "human-signal absolute left-1/2 top-0 h-3 w-1 -translate-x-1/2 bg-signal opacity-0 shadow-brand-cyan sm:left-0 sm:top-1/2 sm:h-1 sm:w-3 sm:translate-x-0 sm:-translate-y-1/2",
          direction === "return" && "human-signal-return",
          active && "human-signal-active",
        )}
      />
      <span className="relative bg-surface px-2 font-mono text-[0.5rem] text-muted-foreground sm:mt-3 sm:block sm:bg-transparent sm:px-0 sm:text-center">
        {label}
      </span>
    </div>
  );
}