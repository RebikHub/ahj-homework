import GameGoblin from './game';

console.log('app started');

const app = new GameGoblin();

app.renderApp();

const completeField = Array.from(document.querySelectorAll('.game-cell'));

app.getRandomPicture(completeField);

setInterval(() => {
  app.getRandomPicture(completeField);
}, 1500);

app.gameClick(completeField);
