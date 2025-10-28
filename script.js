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
// Name step logic
const nameStep = document.getElementById('nameStep');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const mainContent = document.getElementById('mainContent');
const greeting = document.getElementById('greeting');

const errorMsg = document.getElementById('errorMsg');
startBtn.addEventListener('click', () => {
    let name = nameInput.value.trim();
    if (!name) {
        nameInput.focus();
        nameInput.placeholder = 'Please enter your name!';
        errorMsg.textContent = 'Name is required!';
        return;
    }
    if (name.toLowerCase() !== 'palak') {
        errorMsg.textContent = "NOPE! THIS PARTY'S FOR SOMEONE ELSE!";
        nameInput.value = '';
        nameInput.focus();
        return;
    }
    errorMsg.textContent = '';
    greeting.textContent = `Happy Birthday, ${name}!`;
    nameStep.classList.add('hidden');
    mainContent.classList.remove('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 100);
});

// Confetti animation (initialize after mainContent is shown)
let canvas, ctx, W, H, confettiPieces = [], confettiColors;
function setupConfetti() {
    canvas = document.getElementById('confetti');
    ctx = canvas.getContext('2d');
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    confettiColors = ['#ff4081', '#fcb69f', '#fff176', '#69f0ae', '#40c4ff', '#ffd740'];
    confettiPieces = [];
    for (let i = 0; i < 120; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ConfettiPiece() {
    this.x = randomInt(0, W);
    this.y = randomInt(-H, 0);
    this.r = randomInt(5, 10);
    this.color = confettiColors[randomInt(0, confettiColors.length - 1)];
    this.speed = randomInt(2, 5);
    this.tilt = randomInt(-10, 10);
    this.tiltAngle = 0;
}

ConfettiPiece.prototype.draw = function() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.r, this.r / 2, this.tiltAngle, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
};

ConfettiPiece.prototype.update = function() {
    this.y += this.speed;
    this.tiltAngle += 0.05;
    if (this.y > H) {
        this.x = randomInt(0, W);
        this.y = randomInt(-20, 0);
    }
};

function animateConfetti() {
    ctx.clearRect(0, 0, W, H);
    for (let piece of confettiPieces) {
        piece.update();
        piece.draw();
    }
    requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    setupConfetti();
    animateConfetti();
    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });
}

// Only start confetti after mainContent is shown
mainContent.addEventListener('transitionend', startConfetti, { once: true });

// Reveal surprise
const revealBtn = document.getElementById('revealBtn');
const surprise = document.getElementById('surprise');
const beautifulLine = document.getElementById('beautifulLine');
const extraLines = document.getElementById('extraLines');
const specialMessages = document.getElementById('specialMessages');
revealBtn.addEventListener('click', () => {
    surprise.classList.remove('hidden');
    surprise.classList.add('visible');
    revealBtn.style.display = 'none';
    
    // Add birthday music
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play prevented:', e));
    
    setTimeout(() => {
        beautifulLine.classList.remove('hidden');
        beautifulLine.classList.add('visible');
    }, 600);
    setTimeout(() => {
        extraLines.classList.remove('hidden');
        extraLines.classList.add('visible');
    }, 1600);
    setTimeout(() => {
        specialMessages.classList.remove('hidden');
        specialMessages.classList.add('visible');
    }, 2600);
});
