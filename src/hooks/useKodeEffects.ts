import { useEffect } from "react";

export function useKodeEffects(page: string) {
  useEffect(() => {
    const scrollTop = document.getElementById("scroll-top");
    const updateScrollTop = () => scrollTop?.classList.toggle("is-visible", window.scrollY > 420);
    updateScrollTop();
    window.addEventListener("scroll", updateScrollTop, { passive: true });

    const fadeEls = Array.from(document.querySelectorAll(".fade-up"));
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show");
                  observer?.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.12 },
          )
        : null;
    fadeEls.forEach(el => (observer ? observer.observe(el) : el.classList.add("show")));

    return () => {
      window.removeEventListener("scroll", updateScrollTop);
      observer?.disconnect();
    };
  }, [page]);
}
