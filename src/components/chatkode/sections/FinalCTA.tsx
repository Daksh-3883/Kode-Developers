import { Button, Wordmark } from "../primitives";
import { Reveal } from "../Reveal";
import { footerColumns } from "@/content/site";

export function FinalCTA() {
  return (
    <section
      id="try"
      aria-labelledby="cta-title"
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-28 sm:py-36 lg:py-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-atmosphere absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
        <div className="cta-field drift-slow absolute inset-x-0 bottom-0 h-full" />
        <span className="cta-path cta-path-left" />
        <span className="cta-path cta-path-right" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="label-mono text-primary">Start building</p>
        </Reveal>
        <Reveal delay={90}>
          <h2
            id="cta-title"
            className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.75rem]"
          >
            Bring it a problem that <span className="text-gradient-signal">actually resists</span>.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Coding, mathematics, algorithms and reasoning — in one developer-focused product from
            Kode Developers. Build boldly. Think responsibly.
          </p>
        </Reveal>
        <Reveal delay={210}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button href="#coding" size="lg" withArrow className="w-full sm:w-auto">
              See ChatKode work
            </Button>
            <a
              href="#about"
              className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Learn more about Kode Developers
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A developer-focused AI for code, mathematics and algorithms.
            </p>
            <p className="label-mono mt-6 text-[0.6rem]">by Kode Developers</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="label-mono text-[0.6rem] text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-7 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] text-muted-foreground">
            © {new Date().getFullYear()} Kode Developers. All rights reserved.
          </p>
          <p className="font-mono text-[0.7rem] text-muted-foreground">
            ChatKode — AI for code, mathematics & algorithms
          </p>
        </div>
      </div>
    </footer>
  );
}
