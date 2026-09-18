import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/chatkode-logo.png.asset.json";
import { Reveal, useInView } from "./Reveal";
import { assetHref } from "@/lib/routes";

/* ---------------- Button ---------------- */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  className?: string;
  withArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  withArrow,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const base =
    "brand-button group inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out active:translate-y-px active:scale-[0.985]";
  const sizes = {
    md: "min-h-11 px-4 text-sm",
    lg: "min-h-12 px-6 text-[0.95rem]",
  } as const;
  const variants = {
    primary:
      "border border-primary/70 bg-primary text-primary-foreground shadow-brand-blue hover:-translate-y-0.5 hover:border-signal hover:bg-primary-hover hover:shadow-brand-blue-strong",
    outline:
      "border border-border-strong bg-surface/60 text-foreground hover:-translate-y-0.5 hover:border-signal/60 hover:bg-signal-soft hover:shadow-brand-cyan",
    ghost: "text-muted-foreground hover:text-signal",
  } as const;

  const content = (
    <>
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} aria-label={ariaLabel} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

/* ---------------- Section shell ---------------- */

export function Section({
  id,
  children,
  className,
  tone = "base",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "base" | "raised";
  labelledBy?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.18, once: false });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-active={inView ? "true" : "false"}
      className={cn(
        "section-system relative scroll-mt-24 border-t border-border py-24 sm:py-28 lg:py-36",
        tone === "raised" && "bg-surface/40",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  index,
  label,
  title,
  description,
  id,
  align = "left",
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <Reveal className="flex items-center gap-3" delay={0}>
        {index && <span className="label-mono text-primary">{index}</span>}
        <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
        <span className="label-mono">{label}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          id={id}
          className="mt-5 text-3xl leading-[1.08] font-semibold sm:text-4xl lg:text-[2.9rem]"
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={140}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Wordmark ---------------- */

export function Wordmark({ className }: { className?: string }) {
  const logoUrl = logoAsset.url?.startsWith("/__l5e/")
    ? assetHref("docs/Assets/Logo/ChatkodeMark.svg")
    : logoAsset.url;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <img src={logoUrl} alt="ChatKode" className="h-8 w-auto sm:h-9" />
    </span>
  );
}
