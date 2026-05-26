// ======================================================
// CONTACT.JS
// Page specific logic
// Cursor glow effect
// Parallax effects
// Button animations
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CONTACT HEADING PARALLAX ===================== */
  const contactTitle = document.querySelector('#contact h2');
  
  document.addEventListener('mousemove', e => {
    const moveX = (e.clientX - window.innerWidth/2) * 0.015;
    const moveY = (e.clientY - window.innerHeight/2) * 0.015;
    if(contactTitle) contactTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
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


  /* ================= STAGGER CARD ANIMATIONS ================= */
  const cards = document.querySelectorAll("#contact .glass-card");
  
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

});
