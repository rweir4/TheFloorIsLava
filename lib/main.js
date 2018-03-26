import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 505;
  const menu = document.getElementById('menu');
  const play = document.querySelector('button');
  play.addEventListener("click", () => {
    menu.classList.toggle("hide");
    canvas.classList.toggle("hide");
    new Game(ctx).start();
  });
});
