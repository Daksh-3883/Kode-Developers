import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./primitives";
import { CodePanel } from "./CodePanel";
import { heroCode, capabilities } from "@/content/site";
import { Reveal } from "./Reveal";

function Atmosphere({ offset }: { offset: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="grid-atmosphere absolute inset-x-0 -top-24 h-[140%] opacity-70 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_25%,black,transparent)]"
        style={{ transform: `translate3d(0, ${offset * 0.12}px, 0)` }}
      />
      <div className="hero-blue-field absolute inset-x-0 -top-32 h-[42rem]" />
      <svg
        className="hero-circuit absolute inset-0 h-full w-full"
        style={{ transform: `translate3d(0, ${offset * 0.04}px, 0)` }}
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="ck-dots" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ck-dots)" />
        <g className="circuit-paths" fill="none" strokeLinecap="square">
          <path className="circuit-line circuit-line-blue" d="M40 210H220l46-46h154l50 50h170" />
          <path className="circuit-line circuit-line-cyan" d="M720 92v76l52 52h270l72 72" />
          <path className="circuit-line circuit-line-green" d="M90 540h130l52-52h190" />
          <path className="circuit-line circuit-line-gold" d="M850 560h130l48-48h132" />
          <circle className="circuit-node node-blue" cx="470" cy="214" r="4" />
          <circle className="circuit-node node-cyan" cx="772" cy="220" r="4" />
          <circle className="circuit-node node-green" cx="272" cy="488" r="4" />
          <path className="circuit-node node-gold" d="M1028 506l6 6-6 6-6-6z" />
        </g>
      </svg>
      <span className="absolute top-1/3 left-6 font-mono text-[0.7rem] text-foreground/[0.06] select-none">
        ∑ᵢ₌₁ⁿ f(xᵢ) · Δx
      </span>
      <span className="absolute right-8 bottom-1/4 font-mono text-[0.7rem] text-foreground/[0.06] select-none">
        O(n log n)
      </span>
    </div>
  );
}

export function Hero() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setStep(6);
      setTyped(heroCode.length);
      return;
    }

    const timers = [60, 180, 320, 460, 600, 720].map((ms, i) =>
      window.setTimeout(() => setStep(i + 1), ms),
    );
    const typer = window.setInterval(() => {
      setTyped((n) => {
        if (n >= heroCode.length) {
          window.clearInterval(typer);
          return n;
        }
        return n + 1;
      });
    }, 90);

    const onScroll = () => setOffset(Math.min(window.scrollY, 900));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(typer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const enter = (n: number) =>
    cn(
      "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
      step >= n
        ? "translate-y-0 opacity-100 blur-0"
        : "translate-y-3 opacity-0 blur-[6px] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0",
    );

  return (
    <div id="top" className="relative">
      <Atmosphere offset={offset} />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 pt-32 pb-16 sm:px-8 sm:pt-40 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pt-48 lg:pb-24">
        <div className="min-w-0">
          <p className={cn("label-mono flex items-center gap-2.5 text-primary", enter(1))}>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            AI for builders
          </p>

          <h1
            className={cn(
              "mt-6 font-display text-[2.6rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.15rem]",
              enter(2),
            )}
          >
            Think in code.
            <br />
            Solve in mathematics.
            <br />
            <span className="text-gradient-signal">Build with ChatKode.</span>
          </h1>

          <p
            className={cn(
              "mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]",
              enter(3),
            )}
          >
            ChatKode is a developer-focused AI from Kode Developers, made for programming,
            mathematics, algorithms and technical problem solving. It has been specifically taught
            mathematics to strengthen its reasoning on complex algorithmic work.
          </p>

          <div className={cn("mt-9 flex flex-wrap items-center gap-3", enter(4))}>
            <Button href="#try" size="lg" withArrow>
              Try ChatKode
            </Button>
            <Button href="#capabilities" size="lg" variant="outline">
              Explore capabilities
            </Button>
          </div>

          <dl
            className={cn(
              "mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden border border-border bg-border",
              enter(5),
            )}
          >
            {[
              ["Domain", "Engineering"],
              ["Focus", "Reasoning"],
              ["Built by", "Kode Developers"],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0 bg-background px-4 py-3.5">
                <dt className="label-mono text-[0.6rem]">{k}</dt>
                <dd className="mt-1.5 truncate font-mono text-xs text-foreground/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={cn("relative min-w-0", enter(6))}>
          <div aria-hidden className="code-aura absolute -inset-6 -z-10 rounded-2xl" />
          <CodePanel
            title="lateness.py"
            meta="reasoning → model → algorithm → code"
            lines={heroCode}
            visibleLines={typed}
            showCaret={typed < heroCode.length}
            highlightLine={typed < heroCode.length ? Math.max(0, typed - 1) : undefined}
            footer={
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="text-primary">● model: greedy / EDD</span>
                <span>complexity O(n log n)</span>
                <span className="hidden sm:inline">proof sketch: exchange argument</span>
              </div>
            }
          />
        </div>
      </div>

      <Reveal className="relative border-y border-border bg-surface/30" threshold={0.4}>
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 py-5 sm:justify-between sm:px-8">
          {capabilities.map((c) => (
            <li key={c} className="label-mono flex items-center gap-6 text-foreground/70">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
