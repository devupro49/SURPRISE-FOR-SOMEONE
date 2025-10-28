// Ultra cool floating shapes
const floaterContainer = document.getElementById('floaters');
const floaterShapes = [
    { char: '❤', class: 'heart' },
    { char: '💖', class: 'heart' },
    { char: '💗', class: 'heart' },
    { char: '💓', class: 'heart' },
    { char: '�', class: 'heart' },
    { char: '★', class: 'star' },
    { char: '🌟', class: 'star' },
    { char: '✨', class: 'sparkle' },
    { char: '💫', class: 'sparkle' },
    { char: '🎈', class: 'balloon' },
    { char: '🎉', class: 'balloon' },
    { char: '🎵', class: 'music' },
    { char: '🎶', class: 'music' },
    { char: '🦋', class: 'butterfly' }
];
function createFloater() {
    const shape = floaterShapes[Math.floor(Math.random() * floaterShapes.length)];
    const el = document.createElement('span');
    el.className = `floater ${shape.class}`;
    el.textContent = shape.char;
    el.style.left = Math.random() * 95 + 'vw';
    el.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
    el.style.animationDuration = (Math.random() * 3 + 7) + 's';
    el.style.opacity = (Math.random() * 0.4 + 0.6).toFixed(2);
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    floaterContainer.appendChild(el);
    setTimeout(() => {
        el.remove();
    }, 10000);
}
setInterval(createFloater, 600);
// Flying particles background
const particlesCanvas = document.getElementById('particles-bg');
const particlesCtx = particlesCanvas.getContext('2d');
let pW = window.innerWidth;
let pH = window.innerHeight;
particlesCanvas.width = pW;
particlesCanvas.height = pH;

const particles = [];
const PARTICLE_COUNT = 60;
const PARTICLE_COLORS = ['#00fff7', '#ff4081', '#fff', '#2c5364'];
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function Particle() {
    this.x = randomFloat(0, pW);
    this.y = randomFloat(0, pH);
    this.radius = randomFloat(1.5, 4.5);
    this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.speedX = randomFloat(-0.5, 0.5);
    this.speedY = randomFloat(-0.2, 0.2);
    this.alpha = randomFloat(0.3, 0.8);
}
Particle.prototype.draw = function() {
    particlesCtx.save();
    particlesCtx.globalAlpha = this.alpha;
    particlesCtx.beginPath();
    particlesCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    particlesCtx.fillStyle = this.color;
    particlesCtx.shadowColor = this.color;
    particlesCtx.shadowBlur = 12;
    particlesCtx.fill();
    particlesCtx.restore();
};
Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > pW) this.speedX *= -1;
    if (this.y < 0 || this.y > pH) this.speedY *= -1;
};
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}
function animateParticles() {
    particlesCtx.clearRect(0, 0, pW, pH);
    for (let p of particles) {
        p.update();
        p.draw();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize', () => {
    pW = window.innerWidth;
    pH = window.innerHeight;
    particlesCanvas.width = pW;
    particlesCanvas.height = pH;
});
/* Updated: require birthdate step after name validation.
   Behavior:
   - User enters name -> if name === "Palak" (case-insensitive) show date step
   - User confirms date -> if day===28 && month===10 proceed to main content
   - Otherwise show "NOPE" style error
*/

(function(){
  // DOM refs
  const startBtn = document.getElementById('startBtn');
  const nameInput = document.getElementById('nameInput');
  const errorMsg = document.getElementById('errorMsg');

  const dateStep = document.getElementById('dateStep');
  const dateInput = document.getElementById('dateInput');
  const dateSubmitBtn = document.getElementById('dateSubmitBtn');
  const dateError = document.getElementById('dateError');
  const backToName = document.getElementById('backToName');

  const mainContent = document.getElementById('mainContent');
  const nameStep = document.getElementById('nameStep');
  const greeting = document.getElementById('greeting');
  const dateDisplay = document.getElementById('dateDisplay');

  const revealBtn = document.getElementById('revealBtn');
  const musicToggle = document.getElementById('musicToggle');

  const surprise = document.getElementById('surprise');
  const beautifulLine = document.getElementById('beautifulLine');
  const extraLines = document.getElementById('extraLines');
  const specialMessages = document.getElementById('specialMessages');
  const pickupLines = document.getElementById('pickupLines');

  // audio variables (kept from previous implementation)
  let audioCtx = null;
  let masterGain = null;
  let melodyInterval = null;
  let isPlaying = false;

  function createAudioContext() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(audioCtx.destination);
  }
  function playShimmer(){ /* ...existing code... */ }
  function startMelodyLoop(){ /* ...existing code... */ }
  function stopMelodyLoop(){ /* ...existing code... */ }
  function toggleMusic(){ /* ...existing code... */ }

  // --- NEW: Name submission -> show date step if correct name ---
  startBtn.addEventListener('click', () => {
    const name = (nameInput.value || '').trim();
    if (!name) {
      errorMsg.textContent = "Please enter a name.";
      return;
    }
    if (name.toLowerCase() !== 'palak') {
      errorMsg.textContent = "NOPE! THIS PARTY'S FOR SOMEONE ELSE!";
      return;
    }
    // name OK -> show date step
    errorMsg.textContent = "";
    nameStep.classList.add('hidden');
    nameStep.classList.remove('visible');
    dateStep.classList.remove('hidden');
    dateStep.classList.add('visible');

    // remember validated name for later
    dateStep.dataset.validName = name;
  });

  // Back button to return to name step
  backToName.addEventListener('click', () => {
    dateStep.classList.add('hidden');
    dateStep.classList.remove('visible');
    nameStep.classList.remove('hidden');
    nameStep.classList.add('visible');
    dateInput.value = '';
    dateError.textContent = '';
  });

  // --- NEW: Date confirmation ---
  dateSubmitBtn.addEventListener('click', () => {
    dateError.textContent = "";
    const val = (dateInput.value || '').trim();
    if (!val) {
      dateError.textContent = "Please select or enter your birth date (day, month & year).";
      return;
    }
    // parse value from yyyy-mm-dd
    const d = new Date(val);
    if (isNaN(d.getTime())) {
      dateError.textContent = "Invalid date format. Use the date picker or enter a valid date.";
      return;
    }
    const day = d.getDate();
    const month = d.getMonth() + 1; // 1..12
    const year = d.getFullYear();

    // expected: 28 October 2011
    if (day !== 28 || month !== 10 || year !== 2011) {
      dateError.textContent = "NOPE! THIS PARTY'S FOR SOMEONE ELSE!";
      return;
    }

    // success -> show main content
    const name = dateStep.dataset.validName || 'Palak';
    dateStep.classList.add('hidden');
    dateStep.classList.remove('visible');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('visible');

    greeting.textContent = `Happy Birthday, ${name}!`;
    dateDisplay.textContent = `28th October 2011 - Your Special Day! 🎉`;

    // small shimmer/feedback
    createAudioContext();
    try { playShimmer(); } catch(e){}
  });

  // --- Reveal logic & other existing handlers (kept) ---
  revealBtn.addEventListener('click', () => {
    // reveal sequence (kept from previous code)
    surprise.classList.remove('hidden'); surprise.classList.add('visible');

    setTimeout(()=> {
      beautifulLine.classList.remove('hidden'); beautifulLine.classList.add('visible','floaty');
    }, 600);

    setTimeout(()=> {
      extraLines.classList.remove('hidden'); extraLines.classList.add('stagger-parent','visible','floaty');
    }, 1200);

    setTimeout(()=> {
      specialMessages.classList.remove('hidden'); specialMessages.classList.add('stagger-parent','visible','floaty');
    }, 1900);

    setTimeout(()=> {
      pickupLines.classList.remove('hidden'); pickupLines.classList.add('stagger-parent','visible','floaty');
    }, 2600);

    // start music
    if (!isPlaying) toggleMusic(); else playShimmer();

    // confetti burst (simple)
    try {
      const confettiCanvas = document.getElementById('confetti');
      if (confettiCanvas && confettiCanvas.getContext) {
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        const particles = [];
        for (let i=0;i<40;i++){
          particles.push({
            x: window.innerWidth/2 + (Math.random()-0.5)*200,
            y: window.innerHeight/3 + (Math.random()-0.5)*200,
            vx: (Math.random()-0.5)*6,
            vy: -Math.random()*8 - 2,
            r: 4+Math.random()*6,
            c: `hsl(${Math.random()*360},80%,60%)`,
            life: 60 + Math.random()*40
          });
        }
        let t = 0;
        const anim = setInterval(()=>{
          ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
          particles.forEach(p=>{
            p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.life--;
            ctx.beginPath();
            ctx.fillStyle = p.c;
            ctx.ellipse(p.x,p.y,p.r,p.r,0,0,Math.PI*2);
            ctx.fill();
          });
          t++;
          if (t>140) { clearInterval(anim); ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); }
        }, 16);
      }
    } catch(e){}
  });

  musicToggle.addEventListener('click', ()=> {
    toggleMusic();
  });

  // ensure AudioContext resumes on user gesture
  ['click','touchstart'].forEach(ev=>{
    window.addEventListener(ev, ()=> {
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }, {once:false});
  });

  // enter key shortcuts
  nameInput.addEventListener('keydown', (e)=> { if (e.key === 'Enter') startBtn.click(); });
  dateInput.addEventListener('keydown', (e)=> { if (e.key === 'Enter') dateSubmitBtn.click(); });

  // expose minimal debug
  window.__birthdayFlow = { /* ... */ };
})();
