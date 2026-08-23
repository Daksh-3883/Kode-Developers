const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const GRAVITY = 0.20;
const FLAP_POWER = -4.5;
const PIPE_WIDTH = 65;
const PIPE_GAP = 150;
const PIPE_SPEED = 2.5;
const PIPE_SPAWN_INTERVAL = 1600;
const GROUND_HEIGHT = 80;

const state = {
    bird: null,
    pipes: [],
    score: 0,
    bestScore: parseInt(localStorage.getItem('flappyBest'), 10) || 0,
    gameState: 'ready',
    lastPipeTime: 0,
    frameCount: 0,
    groundOffset: 0,
    baseY: 250,
};

function init() {
    state.bird = {
        x: 80,
        y: state.baseY,
        width: 34,
        height: 26,
        velocity: 0,
        rotation: 0,
        wingUp: true,
        wingTimer: 0,
        flapFrame: 0,
    };

    state.pipes = [];
    state.score = 0;
    state.gameState = 'ready';
    state.lastPipeTime = performance.now();
    state.frameCount = 0;
    state.groundOffset = 0;

    overlay.classList.remove('hidden');
    overlay.innerHTML = `
        <h1>Flappy Bird</h1>
        ${state.bestScore > 0 ? `<p class="best-score">Best: ${state.bestScore}</p>` : ''}
        <p>Click or press Space to start</p>
    `;
}

function startGame() {
    state.gameState = 'playing';
    overlay.classList.add('hidden');
    state.bird.velocity = FLAP_POWER;
    state.bird.flapFrame = 8;
}

function flap() {
    if (state.gameState === 'ready') {
        startGame();
        return;
    }

    if (state.gameState === 'playing') {
        state.bird.velocity = FLAP_POWER;
        state.bird.flapFrame = 8;
        return;
    }

    if (state.gameState === 'dead') {
        init();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        flap();
    }
});

canvas.addEventListener('click', flap);
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    flap();
}, { passive: false });

function spawnPipe() {
    const minTop = 80;
    const maxTop = CANVAS_HEIGHT - GROUND_HEIGHT - PIPE_GAP - 80;
    const topHeight = Math.random() * (maxTop - minTop) + minTop;

    state.pipes.push({
        x: CANVAS_WIDTH,
        topHeight,
        bottomY: topHeight + PIPE_GAP,
        scored: false,
    });
}

function update(delta) {
    state.frameCount += 1;

    if (state.gameState === 'ready') {
        state.bird.y = state.baseY + Math.sin(state.frameCount * 0.08) * 15;
        state.bird.wingTimer += 1;

        if (state.bird.wingTimer > 8) {
            state.bird.wingUp = !state.bird.wingUp;
            state.bird.wingTimer = 0;
        }

        state.groundOffset = (state.groundOffset + 1) % 24;
        return;
    }

    if (state.gameState !== 'playing') {
        return;
    }

    state.bird.velocity += GRAVITY;
    state.bird.y += state.bird.velocity;
    state.bird.rotation = Math.min(Math.max(state.bird.velocity * 3, -30), 90);

    if (state.bird.flapFrame > 0) {
        state.bird.flapFrame -= 1;
    }

    state.bird.wingTimer += 1;
    if (state.bird.wingTimer > 6) {
        state.bird.wingUp = !state.bird.wingUp;
        state.bird.wingTimer = 0;
    }

    state.groundOffset = (state.groundOffset + PIPE_SPEED) % 24;

    const now = performance.now();
    if (now - state.lastPipeTime > PIPE_SPAWN_INTERVAL) {
        if (state.pipes.length === 0 || CANVAS_WIDTH - state.pipes[state.pipes.length - 1].x > 180) {
            spawnPipe();
            state.lastPipeTime = now;
        }
    }

    for (let i = state.pipes.length - 1; i >= 0; i -= 1) {
        const pipe = state.pipes[i];
        pipe.x -= PIPE_SPEED;

        if (!pipe.scored && pipe.x + PIPE_WIDTH < state.bird.x) {
            pipe.scored = true;
            state.score += 1;
        }

        if (pipe.x + PIPE_WIDTH < -10) {
            state.pipes.splice(i, 1);
        }
    }

    checkCollision();
}

function checkCollision() {
    if (state.bird.y + state.bird.height > CANVAS_HEIGHT - GROUND_HEIGHT || state.bird.y < 0) {
        die();
        return;
    }

    const bx = state.bird.x + 4;
    const by = state.bird.y + 4;
    const bw = state.bird.width - 8;
    const bh = state.bird.height - 8;

    for (const pipe of state.pipes) {
        if (bx + bw > pipe.x && bx < pipe.x + PIPE_WIDTH) {
            if (by < pipe.topHeight || by + bh > pipe.bottomY) {
                die();
                return;
            }
        }
    }
}

function die() {
    state.gameState = 'dead';

    if (state.score > state.bestScore) {
        state.bestScore = state.score;
        localStorage.setItem('flappyBest', state.bestScore);
    }

    let medal = '';
    if (state.score >= 40) medal = '🏆';
    else if (state.score >= 30) medal = '🥇';
    else if (state.score >= 20) medal = '🥈';
    else if (state.score >= 10) medal = '🥉';

    overlay.classList.remove('hidden');
    overlay.innerHTML = `
        ${medal ? `<div class="medal">${medal}</div>` : ''}
        <h1>Game Over</h1>
        <p class="score-display">Score: ${state.score}</p>
        <p class="best-score">Best: ${state.bestScore}</p>
        <p>Click or press Space to restart</p>
    `;
}

function draw() {
    drawBackground();
    state.pipes.forEach(drawPipe);
    drawGround();
    drawBird();
    drawHud();
}

function drawBackground() {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT - GROUND_HEIGHT);
    skyGrad.addColorStop(0, '#4EC5F1');
    skyGrad.addColorStop(1, '#71D1F4');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT);

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    drawCloud(50 - (state.frameCount * 0.3 % 500), 80, 1);
    drawCloud(220 - (state.frameCount * 0.2 % 500), 140, 0.7);
    drawCloud(350 - (state.frameCount * 0.35 % 500), 60, 0.9);
    drawCloud(150 - (state.frameCount * 0.15 % 500), 200, 0.6);

    const cityY = CANVAS_HEIGHT - GROUND_HEIGHT;
    ctx.fillStyle = '#8BC34A';
    for (let i = 0; i < CANVAS_WIDTH; i += 30) {
        const h = Math.sin(i * 0.05) * 20 + 30 + Math.cos(i * 0.1) * 15;
        ctx.fillRect(i, cityY - h, 32, h);
    }

    ctx.fillStyle = '#7CB342';
    for (let i = 15; i < CANVAS_WIDTH; i += 40) {
        const h = Math.cos(i * 0.07) * 15 + 20;
        ctx.fillRect(i, cityY - h, 35, h);
    }
}

function drawCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.arc(25, -5, 20, 0, Math.PI * 2);
    ctx.arc(50, 0, 25, 0, Math.PI * 2);
    ctx.arc(20, 5, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawGround() {
    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, groundY, CANVAS_WIDTH, GROUND_HEIGHT);

    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, groundY, CANVAS_WIDTH, 15);
    ctx.fillStyle = '#66BB6A';
    ctx.fillRect(0, groundY, CANVAS_WIDTH, 5);

    ctx.fillStyle = '#C8A96E';
    for (let i = -state.groundOffset; i < CANVAS_WIDTH + 24; i += 24) {
        ctx.fillRect(i, groundY + 20, 12, 4);
        ctx.fillRect(i + 12, groundY + 30, 12, 4);
        ctx.fillRect(i, groundY + 40, 12, 4);
    }
}

function drawPipe(pipe) {
    const capHeight = 26;
    const capOverhang = 5;

    const bodyGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
    bodyGrad.addColorStop(0, '#4CAF50');
    bodyGrad.addColorStop(0.3, '#66BB6A');
    bodyGrad.addColorStop(0.7, '#4CAF50');
    bodyGrad.addColorStop(1, '#388E3C');

    ctx.fillStyle = bodyGrad;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight - capHeight);

    const capGrad = ctx.createLinearGradient(pipe.x - capOverhang, 0, pipe.x + PIPE_WIDTH + capOverhang, 0);
    capGrad.addColorStop(0, '#4CAF50');
    capGrad.addColorStop(0.3, '#81C784');
    capGrad.addColorStop(0.7, '#4CAF50');
    capGrad.addColorStop(1, '#2E7D32');

    ctx.fillStyle = capGrad;
    ctx.fillRect(pipe.x - capOverhang, pipe.topHeight - capHeight, PIPE_WIDTH + capOverhang * 2, capHeight);
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 2;
    ctx.strokeRect(pipe.x - capOverhang, pipe.topHeight - capHeight, PIPE_WIDTH + capOverhang * 2, capHeight);

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(pipe.x + 8, 0, 8, pipe.topHeight - capHeight);

    ctx.fillStyle = bodyGrad;
    ctx.fillRect(pipe.x, pipe.bottomY + capHeight, PIPE_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT - pipe.bottomY - capHeight);
    ctx.fillStyle = capGrad;
    ctx.fillRect(pipe.x - capOverhang, pipe.bottomY, PIPE_WIDTH + capOverhang * 2, capHeight);
    ctx.strokeRect(pipe.x - capOverhang, pipe.bottomY, PIPE_WIDTH + capOverhang * 2, capHeight);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(pipe.x + 8, pipe.bottomY + capHeight, 8, CANVAS_HEIGHT - GROUND_HEIGHT - pipe.bottomY - capHeight);

    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 2;
    ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight - capHeight);
    ctx.strokeRect(pipe.x, pipe.bottomY + capHeight, PIPE_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT - pipe.bottomY - capHeight);
}

function drawBird() {
    ctx.save();
    ctx.translate(state.bird.x + state.bird.width / 2, state.bird.y + state.bird.height / 2);
    ctx.rotate((state.bird.rotation * Math.PI) / 180);

    ctx.fillStyle = '#FFEB3B';
    ctx.strokeStyle = '#E0A800';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, state.bird.width / 2, state.bird.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const wingY = state.bird.wingUp ? 2 : -4;
    ctx.fillStyle = '#FBC02D';
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.quadraticCurveTo(-18, wingY, -6, 12);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(8, -2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(10, -2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff7043';
    ctx.beginPath();
    ctx.moveTo(18, 2);
    ctx.lineTo(29, -1);
    ctx.lineTo(18, -6);
    ctx.fill();

    ctx.restore();
}

function drawHud() {
    if (state.gameState === 'playing') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(12, 12, 70, 30);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(state.score, 20, 36);
    }
}

let lastTimestamp = performance.now();

function loop(timestamp) {
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    update(delta);
    draw();
    requestAnimationFrame(loop);
}

init();
requestAnimationFrame(loop);
