// ======================================================
// BATTLEWAALE.JS
// Page specific logic
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO FLOAT EFFECT ================= */
  const heroArt = document.querySelector(".hero-art");

  document.addEventListener("mousemove", (e) => {

    if(!heroArt || window.innerWidth < 992) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.012;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.012;

    heroArt.style.transform =
      `translate(${moveX}px, ${moveY}px)`;
  });


  /* ================= CARD STAGGER ================= */
  const cards = document.querySelectorAll("#characters .glass-card");

  cards.forEach((card,index)=>{
    card.style.transitionDelay = `${index * 0.08}s`;
  });


  /* ================= CTA BUTTON RIPPLE ================= */
  const buttons = document.querySelectorAll("a");

  buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "all .25s ease";
      btn.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
    });

  });


  /* ================= TITLE PULSE ================= */
  const title = document.querySelector("#home h1");

  if(title){
    setInterval(()=>{
      title.classList.toggle("glow-text");
    }, 2200);
  }

});
