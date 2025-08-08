// Vídeos do YouTube sobre saúde, exercício e alimentação
// by Copilot

const videos = [
  {
    id: 'NnQETDNo0v4',
    title: 'Como calcular o IMC corretamente?',
    channel: 'Saúde na Rotina'
  },
  {
    id: 'g8L439_DmXw',
    title: '10 Exercícios para fazer em casa',
    channel: 'Exercício em Casa'
  },
  {
    id: 'Huii3YbR6ek',
    title: 'Alimentação saudável: por onde começar?',
    channel: 'Nutrição Simples'
  },
  {
    id: 'ykkty8JCx30',
    title: 'Dicas para perder peso com saúde',
    channel: 'Saúde e Bem-estar'
  },
  {
    id: 'JyDMM--5Fk8',
    title: 'Como manter a motivação para treinar',
    channel: 'Motivação Fitness'
  }
];

let current = 0;
const videosPerPage = 3;

function renderVideos() {
  const list = document.querySelector('.videos-list');
  list.innerHTML = '';
  for (let i = current; i < Math.min(current + videosPerPage, videos.length); i++) {
    const v = videos[i];
    const div = document.createElement('div');
    div.className = 'video-item';
    div.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">
        <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${v.title}" />
        <div class="video-info">
          <strong>${v.title}</strong><br>
          <span>${v.channel}</span>
        </div>
      </a>
    `;
    list.appendChild(div);
  }
}

renderVideos();

document.getElementById('ver-mais-videos').addEventListener('click', function() {
  current += videosPerPage;
  if (current >= videos.length) current = 0;
  renderVideos();
});
