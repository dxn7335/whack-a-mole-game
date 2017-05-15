import Game from './game';

window.onload = function() {
  const element = document.getElementById('game');
  const game = new Game(element);

  game.init();
};
