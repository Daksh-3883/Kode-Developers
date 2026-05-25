// ======================================================
// COMMON.JS
// Shared logic for all pages
// Theme Toggle
// Navbar Scroll
// Mobile Menu
// Fade Reveal
// Loader
// Active Nav
// FLOWING RGB HEXAGON ENGINE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME ================= */
  const themeBtn = document.getElementById("theme-toggle");

  function applyTheme(mode){
    if(mode === "dark"){
      document.body.classList.add("dark-theme");
      if(themeBtn) themeBtn.textContent = "☀️";
    }else{
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
      navbar.style.boxShadow = "0 12px 28px rgba(0,0,0,.14)";
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

// ===================== FLOWING RGB HEXAGON ENGINE =====================
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
const hexSize = 35; // Size of hexagons
const colors = ['#ff4d4d', '#00f2ff', '#ff944d', '#ffe600', '#bc00ff', '#0070ff']; // Red, Cyan, Orange, Yellow, Purple, Blue

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

// Math helper to smoothly blend between your RGB colors
function interpolateColor(color1, color2, factor) {
  const hex = (c) => parseInt(c.slice(1), 16);
  const r1 = (hex(color1) >> 16) & 0xff, g1 = (hex(color1) >> 8) & 0xff, b1 = hex(color1) & 0xff;
  const r2 = (hex(color2) >> 16) & 0xff, g2 = (hex(color2) >> 8) & 0xff, b2 = hex(color2) & 0xff;
  
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  
  return `rgb(${r}, ${g}, ${b})`;
}

// Calculates the "waterfall" color effect based on vertical position
function getFlowColor(y, time) {
  const flowSpeed = 0.08; 
  const flowLength = height * 1.5; 
  
  const phase = (y + time * flowSpeed) % flowLength;
  const ratio = phase / flowLength;
  const scaled = ratio * colors.length;
  
  const index = Math.floor(scaled);
  const nextIndex = (index + 1) % colors.length;
  const factor = scaled - index;
  
  return interpolateColor(colors[index], nextIndex === colors.length ? colors[0] : colors[nextIndex], factor);
}

// Draws a single hexagon
function drawHexagon(x, y, size, time, globalAlpha) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  ctx.strokeStyle = getFlowColor(y, time);
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = globalAlpha;
  ctx.stroke();
}

// Main animation loop
function animateBackground(time) {
  ctx.clearRect(0, 0, width, height);
  
  const hexWidth = hexSize * 1.5;
  const hexHeight = hexSize * Math.sqrt(3);
  const columns = Math.ceil(width / hexWidth) + 1;
  const rows = Math.ceil(height / hexHeight) + 1;

  for (let c = 0; c < columns; c++) {
    // Only draw on the extreme left (25%) and right (25%) of the screen
    const leftWingBoundary = columns * 0.25; 
    const rightWingBoundary = columns * 0.75; 
    
    let alpha = 0;
    
    // Calculate fade gradient towards the center
    if (c < leftWingBoundary) {
      alpha = 1 - (c / leftWingBoundary);
    } else if (c > rightWingBoundary) {
      alpha = (c - rightWingBoundary) / (columns - rightWingBoundary);
    } else {
      continue; // Skip center columns to leave text readable
    }

    alpha *= 0.6; // Base transparency limit

    for (let r = 0; r < rows; r++) {
      const x = c * hexWidth;
      const y = r * hexHeight + (c % 2 === 0 ? 0 : hexHeight / 2);
      
      drawHexagon(x, y, hexSize, time, alpha);
    }
  }
  requestAnimationFrame(animateBackground);
}

// Initialize and start background
window.addEventListener('resize', initCanvas);
initCanvas();
requestAnimationFrame(animateBackground);