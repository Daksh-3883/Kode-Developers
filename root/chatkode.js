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
        heroSystem.style.setProperty("--cursor-shift-x", `${x * 10}px`);
        heroSystem.style.setProperty("--cursor-shift-y", `${y * 10}px`);
      }

      if (page) {
        page.style.setProperty("--cursor-x", x.toFixed(4));
        page.style.setProperty("--cursor-y", y.toFixed(4));
      }
    };

    const onLeave = () => {
      heroCenter.style.setProperty("--hero-shift-x", "0px");
      heroCenter.style.setProperty("--hero-shift-y", "0px");
      if (heroSystem) {
        heroSystem.style.setProperty("--cursor-shift-x", "0px");
        heroSystem.style.setProperty("--cursor-shift-y", "0px");
      }
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
  }

  // Hero → product transition: as the visitor scrolls past the hero, the
  // orbital system settles and fades so the page reads as one continuous
  // system handing off to the product demo below, instead of two separate blocks.
  if (hero && !prefersReducedMotion) {
    let heroScrollFrame = null;
    const updateHeroScroll = () => {
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(rect.height * 0.85, 1);
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      hero.style.setProperty("--hero-scroll", progress.toFixed(4));
    };
    const onHeroScroll = () => {
      if (!heroScrollFrame) {
        heroScrollFrame = requestAnimationFrame(() => {
          updateHeroScroll();
          heroScrollFrame = null;
        });
      }
    };
    updateHeroScroll();
    window.addEventListener("scroll", onHeroScroll, { passive: true });
    window.addEventListener("resize", updateHeroScroll);
  }

  // Page continuity: a thin signal line runs behind the sections and draws
  // itself in as the visitor scrolls, tying the hero, product demo,
  // capabilities, workflow and CTA into one connected system.
  const flowLine = document.querySelector(".chatkode-flow-line");
  if (flowLine && !prefersReducedMotion) {
    let flowFrame = null;
    const updateFlow = () => {
      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      flowLine.style.setProperty("--flow-progress", progress.toFixed(4));
    };
    const onFlowScroll = () => {
      if (!flowFrame) {
        flowFrame = requestAnimationFrame(() => {
          updateFlow();
          flowFrame = null;
        });
      }
    };
    updateFlow();
    window.addEventListener("scroll", onFlowScroll, { passive: true });
    window.addEventListener("resize", updateFlow);
  } else if (flowLine) {
    flowLine.style.display = "none";
  }

  // Capability system activation: cards light up progressively as the
  // section scrolls into view, like the ChatKode system routing power to
  // each capability in turn, rather than appearing all at once.
  const capabilitiesSection = document.querySelector(".chatkode-capabilities");
  if (capabilitiesSection && capabilityCards.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    capabilitiesSection.classList.add("is-charging");
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const capabilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const activeCount = Math.ceil(entry.intersectionRatio * capabilityCards.length);
        capabilityCards.forEach((card, i) => {
          card.classList.toggle("is-charged", i < activeCount);
        });
      });
    }, { threshold: thresholds });
    capabilityObserver.observe(capabilitiesSection);
  } else {
    capabilityCards.forEach(card => card.classList.add("is-charged"));
  }

  // Final CTA convergence: once the CTA is reached, surrounding system
  // noise settles and the ChatKode mark becomes the sole focus.
  const buildSection = document.querySelector(".chatkode-build__wrap");
  if (buildSection && !prefersReducedMotion && "IntersectionObserver" in window) {
    buildSection.classList.add("is-pending");
    const buildObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buildSection.classList.add("is-converged");
          buildObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    buildObserver.observe(buildSection);
  } else if (buildSection) {
    buildSection.classList.add("is-converged");
  }

  // Scroll-aware product-demo state progression for ask → understand → build → refine.
  const meet = document.querySelector(".chatkode-meet");
  const demo = document.querySelector(".chatkode-demo");
  const productMessages = Array.from(document.querySelectorAll(".chatkode-demo__message"));
  const productCodeLines = Array.from(document.querySelectorAll(".chatkode-demo__code-line"));

  if (meet && demo && !prefersReducedMotion) {
    const getStage = progress => {
      if (progress < 0.22) return "ask";
      if (progress < 0.48) return "understand";
      if (progress < 0.72) return "build";
      return "refine";
    };

    const updateDemoStory = () => {
      const rect = meet.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight, 1);
      const scrollRatio = Math.min(Math.max((-rect.top) / distance, 0), 1);
      const stage = getStage(scrollRatio);
      demo.dataset.storyStage = stage;

      demo.style.setProperty("--story-progress", scrollRatio.toFixed(4));
      demo.style.setProperty("--story-stage", stage);

      productMessages.forEach((message, index) => {
        const isActive = index <= (stage === "ask" ? 1 : stage === "understand" ? 1 : stage === "build" ? 2 : 3);
        message.classList.toggle("is-active", isActive);
      });

      productCodeLines.forEach((line, index) => {
        line.classList.toggle("is-revealed", index < (stage === "build" ? 1 : stage === "refine" ? 2 : 1));
      });
    };

    const onScroll = () => {
      if (!updateDemoStoryFrame) {
        updateDemoStoryFrame = requestAnimationFrame(() => {
          updateDemoStory();
          updateDemoStoryFrame = null;
        });
      }
    };

    let updateDemoStoryFrame = null;
    updateDemoStory();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateDemoStory);
  }

  // Accessibility and reduced motion fallbacks.
  if (prefersReducedMotion) {
    storySections.forEach(section => section.classList.add("is-visible"));
    capabilityCards.forEach(card => card.classList.add("is-active", "is-charged"));
    workflowSteps.forEach(step => step.classList.add("is-visible"));
    const buildWrap = document.querySelector(".chatkode-build__wrap");
    if (buildWrap) buildWrap.classList.add("is-converged");
  }
});