// ======================================================
// COMMON.JS
// Shared logic for all pages
// ======================================================

window.kodeCommonLoaded = true;

document.addEventListener("DOMContentLoaded", () => {
  function getRootPrefix(){
    const marker = document.querySelector("[data-root-prefix]");
    if(marker) return marker.getAttribute("data-root-prefix") || "";
    return location.pathname.replace(/\\/g, "/").includes("/root/") ? "../" : "";
  }

  function currentPage(){
    const path = location.pathname.split("/").pop() || "index.html";
    if(path === "index.html" || path === "") return "home";
    return path.replace(".html", "");
  }

  function renderSharedChrome(){
    const root = getRootPrefix();
    const isRootPage = root === "../";
    const page = currentPage();
    const logo = `${root}docs/Assets/Logo/Main-mark.svg`;
    const iconBase = `${root}docs/Assets/icons`;
    const items = [
      {key:"home", label:"Home", href:"index.html", home:true},
      {key:"products", label:"Products", href:"products.html"},
      {key:"projects", label:"Projects", href:"projects.html"},
      {key:"ai", label:"AI & Research", href:"ai.html"},
      {key:"chatkode", label:"ChatKode", href:"chatkode.html"},
      {key:"about", label:"About", href:"about.html"},
      {key:"updates", label:"Updates", href:"updates.html"},
      {key:"contact", label:"Contact", href:"contact.html"}
    ];
    const href = item => item.home
      ? (isRootPage ? "../index.html" : "index.html")
      : (isRootPage ? item.href : `root/${item.href}`);
    const navLinks = items.map(item => {
      const active = item.key === page ? " active" : "";
      const aria = item.key === page ? ' aria-current="page"' : "";
      return `<li><a href="${href(item)}" class="site-nav__link nav-link${active}" data-page="${item.key}"${aria}>${item.label}</a></li>`;
    }).join("");
    const mobileLinks = items.map(item => {
      const active = item.key === page ? " active" : "";
      const aria = item.key === page ? ' aria-current="page"' : "";
      return `<a href="${href(item)}" class="site-nav__mobile-link nav-link${active}" data-page="${item.key}"${aria}>${item.label}</a>`;
    }).join("");
    const productHref = isRootPage ? "products.html" : "root/products.html";
    const chatkodeHref = isRootPage ? "chatkode.html" : "root/chatkode.html";
    const footerLinks = items.map(item => `<li><a href="${href(item)}">${item.label}</a></li>`).join("");

    const nav = document.getElementById("navbar");
    if(nav){
      nav.className = "site-nav";
      nav.innerHTML = `
        <div class="site-nav__inner">
          <a href="${href(items[0])}" class="site-brand" aria-label="Kode Developers home">
            <img src="${logo}" alt="Kode Developers" class="site-brand__logo">
          </a>
          <div class="site-nav__actions">
            <ul class="site-nav__links">${navLinks}</ul>
            <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle theme">
              <span class="theme-toggle__icon" aria-hidden="true">
                <img src="${iconBase}/UI/sun.svg" alt="" class="theme-toggle__sun">
                <img src="${iconBase}/UI/moon.svg" alt="" class="theme-toggle__moon">
              </span>
              <span class="theme-toggle__knob" aria-hidden="true"></span>
            </button>
            <button id="menu-btn" class="menu-button" type="button" aria-label="Open menu" aria-expanded="false">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="site-nav__mobile hidden scale-y-0 opacity-0">${mobileLinks}</div>
      `;
    }

    document.querySelectorAll("footer[data-shared-footer]").forEach(footer => {
      footer.className = "site-footer";
      footer.innerHTML = `
        <div class="site-footer__inner">
          <div class="site-footer__brand">
            <img src="${logo}" alt="Kode Developers" class="site-footer__logo">
            <p>Focused on building modern software, AI-powered tools, and impactful digital experiences.</p>
            <div class="site-footer__socials" aria-label="Social links">
              <a href="#" class="social-icon" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg></a>
              <a href="#" class="social-icon" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.25 0h3.83V11h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14v5.41h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4V9.5Z"/></svg></a>
              <a href="#" class="social-icon" aria-label="Twitter"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2.25h3.28l-7.17 8.2 8.44 11.16h-6.61l-5.18-6.77-5.92 6.77H2.45l7.67-8.77L2.03 2.25h6.78l4.68 6.19 5.41-6.19Zm-1.15 17.4h1.82L7.82 4.1H5.87l11.88 15.55Z"/></svg></a>
              <a href="mailto:ceo@kodedevelopers.org" class="social-icon" aria-label="Email"><img src="${iconBase}/Actions/mail.svg" alt="" aria-hidden="true"></a>
            </div>
          </div>
          <div class="site-footer__column">
            <h2>Quick Links</h2>
            <ul>${footerLinks}</ul>
          </div>
          <div class="site-footer__column">
            <h2>Products</h2>
            <ul>
              <li><a href="${chatkodeHref}">ChatKode</a></li>
              <li><span>Kode Toolbox</span></li>
              <li><span>Kode Insights</span></li>
              <li><a href="${productHref}">All Products</a></li>
            </ul>
          </div>
          <div class="site-footer__column site-footer__updates">
            <h2>Stay Updated</h2>
            <p>Get the latest updates about our products and projects.</p>
            <form class="site-footer__form" action="#" onsubmit="return false">
              <label class="sr-only" for="footer-email">Email address</label>
              <input id="footer-email" type="email" placeholder="Enter your email" autocomplete="email">
              <button type="submit" aria-label="Submit email"><img src="${iconBase}/UI/arrow-right.svg" alt="" aria-hidden="true"></button>
            </form>
          </div>
        </div>
        <p class="site-footer__bottom">&copy; 2026 Kode Developers. All rights reserved.</p>
      `;
    });

    if(!document.getElementById("scroll-top")){
      const scrollTop = document.createElement("button");
      scrollTop.id = "scroll-top";
      scrollTop.className = "scroll-top";
      scrollTop.type = "button";
      scrollTop.setAttribute("aria-label", "Back to top");
      scrollTop.setAttribute("title", "Back to top");
      scrollTop.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 10 6-6 6 6M12 4v16"/></svg>`;
      document.body.appendChild(scrollTop);
    }
  }

  renderSharedChrome();

  const themeBtn = document.getElementById("theme-toggle");

  function applyTheme(mode){
    if(mode === "dark"){
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      themeBtn?.setAttribute("aria-label", "Switch to light theme");
    }else{
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      themeBtn?.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  const scrollTop = document.getElementById("scroll-top");
  const updateScrollTop = () => scrollTop?.classList.toggle("is-visible", window.scrollY > 420);
  updateScrollTop();
  window.addEventListener("scroll", updateScrollTop, { passive:true });
  scrollTop?.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  themeBtn?.addEventListener("click", () => {
    const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  function hideLoader(){
    const loader = document.getElementById("loader");
    if(!loader) return;
    loader.classList.add("hide");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

  setTimeout(hideLoader, 1000);
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 3500);

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if(menuBtn && mobileMenu){
    const bars = menuBtn.querySelectorAll(".bar");

    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.contains("flex");

      if(!open){
        mobileMenu.classList.remove("hidden");
        menuBtn.setAttribute("aria-expanded", "true");

        setTimeout(() => {
          mobileMenu.classList.add("flex", "scale-y-100", "opacity-100");
          mobileMenu.classList.remove("scale-y-0", "opacity-0");
        }, 10);

        bars[0]?.classList.add("rotate-45", "translate-y-[6px]");
        bars[1]?.classList.add("opacity-0");
        bars[2]?.classList.add("-rotate-45", "-translate-y-[6px]");
      }else{
        mobileMenu.classList.remove("scale-y-100", "opacity-100");
        mobileMenu.classList.add("scale-y-0", "opacity-0");
        menuBtn.setAttribute("aria-expanded", "false");

        setTimeout(() => {
          mobileMenu.classList.remove("flex");
          mobileMenu.classList.add("hidden");
        }, 300);

        bars.forEach(bar => {
          bar.classList.remove("rotate-45", "-rotate-45", "translate-y-[6px]", "-translate-y-[6px]", "opacity-0");
        });
      }
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("flex", "scale-y-100", "opacity-100");
        mobileMenu.classList.add("hidden", "scale-y-0", "opacity-0");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const navbar = document.getElementById("navbar");
  let lastY = window.scrollY;
  let hidden = false;

  window.addEventListener("scroll", () => {
    if(!navbar) return;
    const y = window.scrollY;

    if(y > 30){
      navbar.classList.add("is-scrolled");
    }else{
      navbar.classList.remove("is-scrolled");
    }

    if(y > lastY && y > 120 && !hidden){
      navbar.style.transform = "translateX(-50%) translateY(-140%)";
      hidden = true;
    }

    if(y < lastY && hidden){
      navbar.style.transform = "translateX(-50%) translateY(0)";
      hidden = false;
    }

    lastY = y;
  });

  const fadeEls = document.querySelectorAll(".fade-up");

  if(fadeEls.length){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});

    fadeEls.forEach(el => observer.observe(el));
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActive(){
    let current = "";
    const page = currentPage();

    sections.forEach(sec => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;

      if(window.scrollY >= top && window.scrollY < top + height){
        current = sec.id;
      }
    });

    const hasSectionLink = current && Array.from(navLinks).some(link => link.getAttribute("href") === `#${current}`);

    navLinks.forEach(link => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");

      if((hasSectionLink && link.getAttribute("href") === `#${current}`) || (!hasSectionLink && link.dataset.page === page)){
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  window.addEventListener("scroll", setActive);
  setActive();
});
