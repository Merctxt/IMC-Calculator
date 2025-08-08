const canvas = document.getElementById('minigame-canvas');
const container = document.getElementById('minigame-container');
const scoreDiv = document.getElementById('minigame-score');

let width = window.innerWidth;
let height = window.innerHeight;
let score = 0;
let objects = [];
let running = true;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'auto';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.maxWidth = 'none';
  container.style.margin = '0';
  scoreDiv.style.position = 'fixed';
  scoreDiv.style.top = '10px';
  scoreDiv.style.right = '20px';
  scoreDiv.style.zIndex = '2';
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomObject() {
  const types = [
    { color: '#ffb347', emoji: '🍎', points: 1 },
    { color: '#7ec850', emoji: '🥦', points: 2 },
    { color: '#f76d6d', emoji: '❤️', points: 3 },
    { color: '#6ec6ff', emoji: '💧', points: 1 },
    { color: '#b388ff', emoji: '🏋️', points: 2 }
  ];
  const t = types[Math.floor(Math.random() * types.length)];
  return {
    x: Math.random() * (width - 40) + 20,
    y: -30,
    r: 32, // maior para facilitar o clique
    vy: 2.5, // velocidade fixa
    ...t
  };
}

function drawObject(ctx, obj) {
  ctx.font = '38px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.93;
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
  ctx.fillStyle = obj.color;
  ctx.shadowColor = obj.color;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.fillText(obj.emoji, obj.x, obj.y + 2);
}

function gameLoop() {
  if (!running) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  // Adiciona novos objetos
  if (Math.random() < 0.025) {
    objects.push(randomObject());
  }
  // Move e desenha
  for (let obj of objects) {
    obj.y += obj.vy;
    drawObject(ctx, obj);
  }
  // Remove objetos fora da tela
  objects = objects.filter(obj => obj.y < height + 30);
  requestAnimationFrame(gameLoop);
}

gameLoop();


canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  // Permite coletar todos os objetos sob o clique de uma vez
  let collected = false;
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    const dx = mx - obj.x;
    const dy = my - obj.y;
    if (dx * dx + dy * dy < obj.r * obj.r) {
      score += obj.points;
      scoreDiv.textContent = `Pontos: ${score}`;
      objects.splice(i, 1);
      collected = true;
    }
  }
  // Efeito de feedback visual (pequeno círculo)
  if (collected) {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.arc(mx, my, 40, 0, 2 * Math.PI);
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.restore();
    // Removido setTimeout/gameLoop extra
  }
});


// O canvas agora cobre todo o fundo do site, e o placar fica fixo no topo direito
