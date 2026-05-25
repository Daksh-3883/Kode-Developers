// ===================== FADE-UP & CURSOR =====================
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

const cursor = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.width = cursor.style.height = '40px');
  el.addEventListener('mouseleave', () => cursor.style.width = cursor.style.height = '20px');
});

// ===================== HERO PARALLAX =====================
const heroTitle = document.querySelector('#home h1');
document.addEventListener('mousemove', e => {
  const moveX = (e.clientX - window.innerWidth/2) * 0.02;
  const moveY = (e.clientY - window.innerHeight/2) * 0.02;
  if(heroTitle) heroTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ===================== RATING SYSTEM =====================
const ratingMsg = document.getElementById('ratingMsg');
const ratingStars = document.querySelectorAll('#rating span');

async function setRating(stars){
  ratingStars.forEach((star,i) => {
    star.classList.toggle('text-yellow-400', i<stars);
    star.classList.toggle('text-gray-500', i>=stars);
    star.classList.add('animate-bounce');
    setTimeout(()=> star.classList.remove('animate-bounce'),500);
  });
  ratingMsg.classList.remove('hidden');
  ratingMsg.textContent = `Thanks! You rated us ${stars}★`;

  try {
    const res = await fetch('/.netlify/functions/addRating',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({stars})
    });
    const data = await res.json();
    if(data.success) loadAverageRating();
  } catch(e){
    console.error('Error saving rating:', e);
  }
}

async function loadAverageRating(){
  try {
    const res = await fetch('/.netlify/functions/addRating?mode=average');
    const data = await res.json();
    if(data.avg !== undefined){
      if(!document.getElementById('avgRating')){
        const p = document.createElement('p');
        p.id = 'avgRating';
        p.className = 'mt-2 text-teal-300 font-medium';
        ratingMsg.parentNode.insertBefore(p, ratingMsg);
      }
      document.getElementById('avgRating').textContent = `⭐ ${data.avg} / 5 (${data.count} reviews)`;
    }
  } catch(e){
    console.error('Error loading average rating:', e);
  }
}
window.setRating = setRating;
loadAverageRating();

window.addEventListener('resize', initCanvas);
initCanvas();
requestAnimationFrame(animateBackground);
