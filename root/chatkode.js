document.addEventListener("DOMContentLoaded", () => {
  if (!window.kodeCommonLoaded) {
    window.kodeCommonLoaded = true;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.querySelector(".chatkode-page");
  const hero = document.querySelector(".chatkode-hero");
  const heroCenter = document.querySelector(".chatkode-hero__center");
  const heroSystem = document.querySelector(".chatkode-hero__system");
  const capabilityCards = Array.from(document.querySelectorAll(".chatkode-capability-card"));
  const workflowSteps = Array.from(document.querySelectorAll(".chatkode-workflow__step"));
  const introCards = Array.from(document.querySelectorAll(".chatkode-section__heading, .chatkode-meet__intro, .chatkode-demo, .chatkode-capability-card, .chatkode-workflow__step, .chatkode-build__wrap"));

  // Reveal major Story sections in a consistent narrative language.
  const storySections = [
    document.querySelector(".chatkode-meet"),
    document.querySelector(".chatcode-capabilities"),
    document.querySelector(".chatkode-capabilities"),
    document.querySelector(".chatkode-workflow"),
    document.querySelector(".chatkode-build")
  ].filter(Boolean);

  storySections.forEach(section => {
    section.classList.add("chatkode-section-reveal");
  });

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.16 });

    storySections.forEach(section => sectionObserver.observe(section));
  } else {
    storySections.forEach(section => section.classList.add("is-visible"));
  }

  // Product interface demo polish: sequentially reveal existing chat and code blocks.
  const demoMessages = Array.from(document.querySelectorAll(".chatkode-demo__message"));
  const codeBlocks = Array.from(document.querySelectorAll(".chatkode-demo__code"));
  const productDemo = document.querySelector(".chatkode-demo");

  if (!prefersReducedMotion && productDemo) {
    productDemo.animate([
      { filter: "blur(0)", transform: "scale(1)", opacity: 1 },
      { filter: "blur(.2px)", transform: "scale(1.01)", opacity: 1 },
      { filter: "blur(0)", transform: "scale(1)", opacity: 1 }
    ], {
      duration: 700,
      easing: "cubic-bezier(.2,.8,.2,1)",
      iterations: 1
    });
  }

  demoMessages.forEach((msg, index) => {
    msg.style.animationDelay = `${100 + index * 180}ms`;
  });

  codeBlocks.forEach((code, index) => {
    code.style.animationDelay = `${260 + index * 220}ms`;
  });

  // Capability presence and selection keep the selected capability visible while showing connected-state behavior.
  capabilityCards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-active");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-active");
    });
    card.addEventListener("focus", () => {
      capabilityCards.forEach(other => other.classList.toggle("is-active", other === card));
    });
    card.addEventListener("click", () => {
      capabilityCards.forEach(other => other.classList.toggle("selected", other === card));
      capabilityCards.forEach(other => other.classList.toggle("is-active", other === card));
    });
  });

  // Workflow steps should progress and the final selected stage should settle visibly.
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const workflowObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          const stepIndex = workflowSteps.indexOf(entry.target);
          workflowSteps.forEach((step, i) => step.classList.toggle("is-active", i <= stepIndex));
        }
      });
    }, { threshold: 0.25 });

    workflowSteps.forEach(step => workflowObserver.observe(step));
  } else {
    workflowSteps.forEach((step, index) => {
      step.classList.add("is-visible");
      if (index === 0) step.classList.add("is-active");
    });
  }

  // Hero ambient pointer field: a tiny, subtle orbital response rather than a page-wide mouse trail.
  if (hero && heroCenter && !prefersReducedMotion) {
    const root = hero.getBoundingClientRect();
    const onMove = event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const y = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      const shiftX = Math.max(-8, Math.min(8, x * 16));
      const shiftY = Math.max(-8, Math.min(8, y * 12));

      heroCenter.style.setProperty("--hero-shift-x", `${shiftX}px`);
      heroCenter.style.setProperty("--hero-shift-y", `${shiftY}px`);

      if (heroSystem) {
        heroSystem.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }

      if (page) {
        page.style.setProperty("--cursor-x", x.toFixed(4));
        page.style.setProperty("--cursor-y", y.toFixed(4));
      }
    };

    const onLeave = () => {
      heroCenter.style.setProperty("--hero-shift-x", "0px");
      heroCenter.style.setProperty("--hero-shift-y", "0px");
      if (heroSystem) heroSystem.style.transform = "translate(0, 0)";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
  }

  // Accessibility and reduced motion fallbacks.
  if (prefersReducedMotion) {
    storySections.forEach(section => section.classList.add("is-visible"));
    capabilityCards.forEach(card => card.classList.add("is-active"));
    workflowSteps.forEach(step => step.classList.add("is-visible"));
  }
});
