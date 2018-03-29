import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 505;

  const menu = document.getElementById('menu');
  const play = document.querySelector('button');

  const gameOverMenu = document.getElementById('game-over-menu');
  const toStart = document.getElementById('to-start');

  const winMenu = document.getElementById('win-menu');
  const winToStart = document.getElementById('win-to-start');

  play.addEventListener("click", () => {
    menu.classList.toggle("hide");
    canvas.classList.toggle("hide");
    new Game(ctx).start();
  });

  toStart.addEventListener("click", () => {
    debugger
    gameOverMenu.classList.toggle("hide");
    menu.classList.remove("hide");
  });

  winToStart.addEventListener("click", () => {
    winMenu.classList.toggle("hide");
    menu.classList.toggle("hide");
  });
});
