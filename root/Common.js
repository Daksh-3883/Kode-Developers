// ======================================================
// COMMON.JS
// Shared logic for all pages
// Theme Toggle
// Navbar Scroll
// Mobile Menu
// Fade Reveal
// Loader
// Active Nav
// ======================================================

window.kodeCommonLoaded = true;

document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME ================= */
  const themeBtn = document.getElementById("theme-toggle");

  function applyTheme(mode){
    if(mode === "dark"){
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      if(themeBtn) themeBtn.textContent = "☀️";
    }else{
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      if(themeBtn) themeBtn.textContent = "🌙";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeBtn?.addEventListener("click", () => {
    const next = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";

    localStorage.setItem("theme", next);
    applyTheme(next);
  });


  /* ================= LOADER ================= */
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


  /* ================= MOBILE MENU ================= */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if(menuBtn && mobileMenu){

    const bars = menuBtn.querySelectorAll(".bar");

    menuBtn.addEventListener("click", () => {

      const open = mobileMenu.classList.contains("flex");

      if(!open){

        mobileMenu.classList.remove("hidden");

        setTimeout(() => {
          mobileMenu.classList.add("flex","scale-y-100","opacity-100");
          mobileMenu.classList.remove("scale-y-0","opacity-0");
        },10);

        bars[0]?.classList.add("rotate-45","translate-y-[6px]");
        bars[1]?.classList.add("opacity-0");
        bars[2]?.classList.add("-rotate-45","-translate-y-[6px]");

      }else{

        mobileMenu.classList.remove("scale-y-100","opacity-100");
        mobileMenu.classList.add("scale-y-0","opacity-0");

        setTimeout(() => {
          mobileMenu.classList.remove("flex");
          mobileMenu.classList.add("hidden");
        },300);

        bars.forEach(bar=>{
          bar.classList.remove(
            "rotate-45",
            "-rotate-45",
            "translate-y-[6px]",
            "-translate-y-[6px]",
            "opacity-0"
          );
        });
      }

    });

    mobileMenu.querySelectorAll("a").forEach(link=>{
      link.addEventListener("click",()=>{
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      });
    });
  }


  /* ================= NAVBAR SCROLL ================= */
  const navbar = document.getElementById("navbar");

  let lastY = window.scrollY;
  let hidden = false;

  window.addEventListener("scroll", () => {

    if(!navbar) return;

    const y = window.scrollY;

    if(y > 30){
      navbar.style.boxShadow = "0 12px 28px var(--color-shadow)";
      navbar.classList.add("scale-95");
    }else{
      navbar.style.boxShadow = "none";
      navbar.classList.remove("scale-95");
    }

    if(y > lastY && y > 120 && !hidden){
      navbar.style.transform = "translate(-50%,-140%)";
      hidden = true;
    }

    if(y < lastY && hidden){
      navbar.style.transform = "translate(-50%,0)";
      hidden = false;
    }

    lastY = y;
  });


  /* ================= FADE REVEAL ================= */
  const fadeEls = document.querySelectorAll(".fade-up");

  if(fadeEls.length){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});

    fadeEls.forEach(el => observer.observe(el));
  }


  /* ================= ACTIVE LINKS ================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActive(){

    let current = "";

    sections.forEach(sec=>{
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;

      if(window.scrollY >= top && window.scrollY < top + height){
        current = sec.id;
      }
    });

    navLinks.forEach(link=>{
      link.classList.remove("active");

      if(link.getAttribute("href") === `#${current}`){
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActive);
  setActive();

});
