import { comparison } from "@/content/site";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-title">
      <SectionHeading
        index="07"
        label="Why ChatKode"
        id="approach-title"
        title={
          <>
            Two ways to answer a technical question. ChatKode is built around{" "}
            <span className="text-primary">the second</span>.
          </>
        }
        description="A comparison of approaches, not of products. Both have their place — ChatKode is deliberately shaped for the right-hand column."
      />

      <div className="mt-14 overflow-hidden border border-border">
        <div className="grid grid-cols-2 border-b border-border bg-surface/60">
          <p className="label-mono px-4 py-3 sm:px-6">Generic assistant</p>
          <p className="label-mono border-l border-border px-4 py-3 text-primary sm:px-6">
            Developer-focused AI
          </p>
        </div>
        {comparison.map((row, i) => (
          <Reveal key={row.generic} delay={i * 70}>
            <div className="grid grid-cols-2 border-b border-border last:border-b-0">
              <p className="px-4 py-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
                {row.generic}
              </p>
              <p className="border-l border-border px-4 py-5 text-sm leading-relaxed text-foreground sm:px-6 sm:text-base">
                <span aria-hidden className="mr-2 font-mono text-xs text-primary">
                  ›
                </span>
                {row.focused}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function KodeDevelopers() {
  return (
    <Section id="about" tone="raised" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="label-mono text-primary">08</span>
            <span className="h-px w-6 bg-border-strong" aria-hidden />
            <span className="label-mono">The company</span>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-8 font-display text-2xl leading-tight font-semibold sm:text-3xl">
              ChatKode
              <span className="mt-2 block text-lg font-normal text-muted-foreground sm:text-xl">
                by <span className="text-foreground">Kode Developers</span>
              </span>
            </p>
          </Reveal>
        </div>
        <div className="space-y-6 self-center">
          <Reveal delay={120}>
            <h2 id="about-title" className="text-2xl leading-snug font-semibold sm:text-3xl">
              A public-facing product from a team that builds software for a living.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Kode Developers created ChatKode as its developer-facing AI product. The intent is
              narrow on purpose: serve people who write code, model problems and care about how a
              solution was reached — and keep the product accountable to that audience.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="label-mono">Kode Developers · product: ChatKode</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
