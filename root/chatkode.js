/* ==========================================================================
   ChatKode — vanilla interactivity
   Navbar scroll/mobile menu, scroll reveals, hero entrance + typewriter,
   code panel copy + language tabs, algorithm diagram hover, footer year.
   ========================================================================== */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------- Navbar ---------------- */
  var navbar = document.getElementById("navbar");
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function onScroll() {
    var scrolled = window.scrollY > 24;
    navbar.classList.toggle("scrolled", scrolled);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("open");
    navbar.classList.remove("menu-open");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    var next = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(next));
    menuToggle.setAttribute("aria-label", next ? "Close menu" : "Open menu");
    mobileMenu.classList.toggle("open", next);
    navbar.classList.toggle("menu-open", next);
    document.body.style.overflow = next ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---------------- Scroll reveals ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion.matches || typeof IntersectionObserver === "undefined") {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Pipeline rail + stage stagger ---------------- */
  var pipeline = document.querySelector("[data-pipeline]");
  if (pipeline) {
    if (reducedMotion.matches || typeof IntersectionObserver === "undefined") {
      pipeline.classList.add("rail-in", "stages-in");
    } else {
      var pipelineObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              pipeline.classList.add("rail-in", "stages-in");
              pipelineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      pipelineObserver.observe(pipeline);
    }
  }

  /* ---------------- Human-first system diagram ---------------- */
  var humanSystem = document.querySelector(".human-system");
  if (humanSystem) {
    if (reducedMotion.matches || typeof IntersectionObserver === "undefined") {
      humanSystem.classList.add("active");
    } else {
      var humanObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              humanSystem.classList.add("active");
              humanObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.22 }
      );
      humanObserver.observe(humanSystem);
    }
  }

  /* ---------------- Hero entrance + typewriter ---------------- */
  var heroSteps = document.querySelectorAll("[data-hero-step]");
  var heroCodeBody = document.querySelector("[data-typewriter] [data-code-body]");
  var heroLines = heroCodeBody ? heroCodeBody.querySelectorAll(".code-line") : [];

  function revealHeroStep(el) { el.classList.add("visible"); }

  if (reducedMotion.matches) {
    heroSteps.forEach(revealHeroStep);
    heroLines.forEach(function (line) { line.classList.add("shown"); });
  } else {
    var stepDelays = [60, 180, 320, 460, 600, 720];
    heroSteps.forEach(function (el) {
      var step = parseInt(el.getAttribute("data-hero-step"), 10);
      var delay = stepDelays[step - 1] || 0;
      window.setTimeout(function () { revealHeroStep(el); }, delay);
    });

    var lineIndex = 0;
    var typer = window.setInterval(function () {
      if (lineIndex >= heroLines.length) {
        window.clearInterval(typer);
        return;
      }
      heroLines[lineIndex].classList.add("shown");
      lineIndex++;
      if (lineIndex >= heroLines.length) window.clearInterval(typer);
    }, 90);
  }

  /* Hero code lines start hidden, slide in as "typed" */
  heroLines.forEach(function (line) {
    line.style.transition = "opacity 500ms, transform 500ms";
    line.style.transform = "translateX(0.5rem)";
    line.style.opacity = "0";
  });
  var heroLineObserverStyle = document.createElement("style");
  heroLineObserverStyle.textContent =
    ".code-line.shown { transform: translateX(0) !important; opacity: 1 !important; }";
  document.head.appendChild(heroLineObserverStyle);

  /* ---------------- Copy buttons ---------------- */
  document.querySelectorAll("[data-copy-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.closest("[data-code-panel]");
      var codeEl = panel ? panel.querySelector("[data-code-body]") : null;
      var text = codeEl ? codeEl.textContent.trim() : "";
      if (!text) return;
      navigator.clipboard.writeText(text).then(
        function () {
          btn.textContent = "copied";
          window.setTimeout(function () { btn.textContent = "copy"; }, 1600);
        },
        function () { /* clipboard unavailable, no-op */ }
      );
    });
  });

  /* ---------------- Language tabs (Coding section) ---------------- */
  var implementations = {
    Python:
      "# binary search on the answer — O(n log S)\n" +
      "def min_capacity(weights, days):\n" +
      "    lo, hi = max(weights), sum(weights)\n" +
      "    while lo < hi:\n" +
      "        mid = (lo + hi) // 2\n" +
      "        if feasible(weights, days, mid): hi = mid\n" +
      "        else: lo = mid + 1\n" +
      "    return lo",
    "C++":
      "// binary search on the answer — O(n log S)\n" +
      "int minCapacity(vector<int>& w, int days) {\n" +
      "  int lo = *max_element(w.begin(), w.end());\n" +
      "  int hi = accumulate(w.begin(), w.end(), 0);\n" +
      "  while (lo < hi) {\n" +
      "    int mid = lo + (hi - lo) / 2;\n" +
      "    feasible(w, days, mid) ? hi = mid : lo = mid + 1;\n" +
      "  }\n" +
      "  return lo;\n" +
      "}",
    JavaScript:
      "// binary search on the answer — O(n log S)\n" +
      "function minCapacity(weights, days) {\n" +
      "  let lo = Math.max(...weights);\n" +
      "  let hi = weights.reduce((a, b) => a + b, 0);\n" +
      "  while (lo < hi) {\n" +
      "    const mid = (lo + hi) >> 1;\n" +
      "    if (feasible(weights, days, mid)) hi = mid;\n" +
      "    else lo = mid + 1;\n" +
      "  }\n" +
      "  return lo;\n" +
      "}",
    TypeScript:
      "// binary search on the answer — O(n log S)\n" +
      "export function minCapacity(weights: number[], days: number): number {\n" +
      "  let lo = Math.max(...weights);\n" +
      "  let hi = weights.reduce((a, b) => a + b, 0);\n" +
      "  while (lo < hi) {\n" +
      "    const mid = (lo + hi) >> 1;\n" +
      "    if (feasible(weights, days, mid)) hi = mid;\n" +
      "    else lo = mid + 1;\n" +
      "  }\n" +
      "  return lo;\n" +
      "}",
    Rust:
      "// binary search on the answer — O(n log S)\n" +
      "pub fn min_capacity(w: &[u32], days: u32) -> u32 {\n" +
      "    let (mut lo, mut hi) = (*w.iter().max().unwrap(), w.iter().sum());\n" +
      "    while lo < hi {\n" +
      "        let mid = lo + (hi - lo) / 2;\n" +
      "        if feasible(w, days, mid) { hi = mid } else { lo = mid + 1 }\n" +
      "    }\n" +
      "    lo\n" +
      "}"
  };

  function escapeHtml(s) {
    return s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function highlightSyntax(code) {
    var escaped = escapeHtml(code);
    escaped = escaped.replace(
      /(#[^\n]*|\/\/[^\n]*)/g,
      '<span class="syn-com">$1</span>'
    );
    escaped = escaped.replace(
      /\b(def|from|import|return|for|in|while|if|else|let|const|function|export|int|pub|fn|mut|u32|number|True|False)\b/g,
      '<span class="syn-key">$1</span>'
    );
    escaped = escaped.replace(
      /\b(feasible|min_capacity|minCapacity|max|sum|reduce|iter|unwrap|max_element|accumulate)\b(?![^<]*<\/span>)/g,
      '<span class="syn-fn">$1</span>'
    );
    return escaped;
  }

  function renderCodeLines(code) {
    var lines = code.split("\n");
    return lines
      .map(function (line, i) {
        return (
          '<span class="code-line shown" data-line>' +
          '<span class="ln">' + (i + 1) + "</span>" +
          '<span class="lc">' + highlightSyntax(line) + "</span>" +
          "</span>"
        );
      })
      .join("\n");
  }

  var codingCodeBody = document.querySelector('[data-lang-body="Python"]');
  if (codingCodeBody) {
    codingCodeBody.innerHTML = renderCodeLines(implementations.Python);
  }

  document.querySelectorAll("[data-lang-tabs]").forEach(function (tabGroup) {
    var panel = tabGroup.closest("[data-code-panel]");
    var codeBody = panel ? panel.querySelector("[data-code-body]") : null;
    var buttons = Array.prototype.slice.call(tabGroup.querySelectorAll("button"));

    function selectTab(btn) {
      buttons.forEach(function (b) {
        var active = b === btn;
        b.setAttribute("aria-selected", String(active));
        b.setAttribute("tabindex", active ? "0" : "-1");
      });
      var lang = btn.getAttribute("data-lang");
      if (codeBody && implementations[lang]) {
        codeBody.innerHTML = renderCodeLines(implementations[lang]);
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () { selectTab(btn); });
    });

    tabGroup.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var current = buttons.indexOf(document.activeElement);
      var nextIndex =
        (current + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) %
        buttons.length;
      var next = buttons[nextIndex];
      if (next) { next.focus(); selectTab(next); }
    });
  });

  /* ---------------- Algorithm diagram hover/focus ---------------- */
  document.querySelectorAll("[data-algo-svg]").forEach(function (svg) {
    var nodes = svg.querySelectorAll(".algo-node");
    var edges = svg.querySelectorAll(".algo-edge");

    function setActive(id) {
      nodes.forEach(function (n) {
        var isThis = n.getAttribute("data-node") === id;
        n.classList.toggle("active", isThis && id !== null);
        n.classList.toggle("dim", id !== null && !isThis);
      });
      edges.forEach(function (edge) {
        edge.classList.toggle("dim", false);
      });
    }

    nodes.forEach(function (node) {
      var id = node.getAttribute("data-node");
      node.addEventListener("mouseenter", function () { setActive(id); });
      node.addEventListener("mouseleave", function () { setActive(null); });
      node.addEventListener("focus", function () { setActive(id); });
      node.addEventListener("blur", function () { setActive(null); });
    });
  });

  /* ---------------- Footer year ---------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
