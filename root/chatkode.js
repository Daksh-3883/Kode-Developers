document.addEventListener("DOMContentLoaded", () => {
  if (!window.kodeCommonLoaded) {
    window.kodeCommonLoaded = true;
  }

  const cards = Array.from(document.querySelectorAll(".chatkode-capability-card"));
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-active");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-active");
    });
  });

  const workflowSteps = Array.from(document.querySelectorAll(".chatkode-workflow__step"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.animate([
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" }
          ], {
            duration: 680,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.22 });

    workflowSteps.forEach(step => observer.observe(step));
  } else {
    workflowSteps.forEach(step => {
      step.style.opacity = "1";
      step.style.transform = "translateY(0)";
    });
  }
});
