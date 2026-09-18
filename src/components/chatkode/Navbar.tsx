import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { nav } from "@/content/site";
import { Button, Wordmark } from "./primitives";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 transition-all duration-700 ease-out sm:px-8",
          mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        )}
      >
        <a href="#top" className="flex items-center" aria-label="ChatKode home">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden justify-center md:flex">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative inline-flex min-h-9 items-center px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button href="#try" size="md" className="hidden sm:inline-flex" withArrow>
            Try ChatKode
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-border-strong md:hidden"
          >
            <span className="relative block h-3 w-4.5" aria-hidden>
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 top-1.5 h-px bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 top-3 h-px bg-current transition-transform duration-300",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-border transition-[max-height,opacity] duration-400 ease-out md:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 pt-2 pb-6 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: `${open ? i * 45 + 60 : 0}ms` }}
                  className={cn(
                    "flex min-h-12 items-center border-b border-border font-display text-lg transition-all duration-300",
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#try" size="lg" className="mt-5 w-full" withArrow>
            Try ChatKode
          </Button>
        </nav>
      </div>
    </header>
  );
}
