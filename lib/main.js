import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 505;

  new Game(ctx).start();
});
