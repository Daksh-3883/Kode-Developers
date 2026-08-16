// ===================== RATING SYSTEM =====================
const ratingMsg = document.getElementById('ratingMsg');
const ratingStars = document.querySelectorAll('#rating button');

async function setRating(stars){
  ratingStars.forEach((star,i) => {
    star.classList.toggle('text-yellow-400', i<stars);
    star.classList.toggle('text-gray-500', i>=stars);
    star.classList.add('animate-bounce');
    setTimeout(()=> star.classList.remove('animate-bounce'),500);
  });

  if(ratingMsg){
    ratingMsg.classList.remove('hidden');
    ratingMsg.textContent = `Thanks! You rated us ${stars} out of 5.`;
  }

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
  if(!ratingMsg) return;

  try {
    const res = await fetch('/.netlify/functions/addRating?mode=average');
    const data = await res.json();
    if(data.avg !== undefined){
      if(!document.getElementById('avgRating')){
        const p = document.createElement('p');
        p.id = 'avgRating';
        p.className = 'rating-message';
        ratingMsg.parentNode.insertBefore(p, ratingMsg);
      }
      document.getElementById('avgRating').textContent = `Average rating: ${data.avg} / 5 (${data.count} reviews)`;
    }
  } catch(e){
    console.error('Error loading average rating:', e);
  }
}

window.setRating = setRating;
loadAverageRating();
