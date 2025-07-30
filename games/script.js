const imagens = ['🍎', '🐶', '🚗', '🌟'];
let cartas = [], cartasViradas = [], bloqueado = false;

function embaralhar(array) {
  return array.concat(array)
    .sort(() => 0.5 - Math.random())
    .map((emoji, index) => ({ id: index, emoji, revelada: false }));
}

function criarTabuleiro() {
  const tabuleiro = document.getElementById('tabuleiro');
  tabuleiro.innerHTML = '';
  cartas = embaralhar(imagens);
  cartas.forEach((carta, index) => {
    const div = document.createElement('div');
    div.classList.add('carta');
    div.dataset.index = index;
    const span = document.createElement('span');
    span.textContent = carta.emoji;
    div.appendChild(span);
    div.addEventListener('click', () => virarCarta(index, div));
    tabuleiro.appendChild(div);
  });
}

function virarCarta(index, el) {
  if (bloqueado || cartas[index].revelada || cartasViradas.length === 2) return;
  cartas[index].revelada = true;
  el.classList.add('revelada');
  cartasViradas.push({ index, el });
  if (cartasViradas.length === 2) {
    const [c1, c2] = cartasViradas;
    if (cartas[c1.index].emoji === cartas[c2.index].emoji) {
      cartasViradas = [];
    } else {
      bloqueado = true;
      setTimeout(() => {
        cartas[c1.index].revelada = false;
        cartas[c2.index].revelada = false;
        c1.el.classList.remove('revelada');
        c2.el.classList.remove('revelada');
        cartasViradas = [];
        bloqueado = false;
      }, 1000);
    }
  }
}

function reiniciarJogo() {
  cartasViradas = [];
  criarTabuleiro();
}
criarTabuleiro();
