console.log('app started');

const gameField = document.getElementById('game');
let randomNumber = null;

for (let i = 1; i < 17; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('game-cell');
  gameField.appendChild(cell);
}

const completeField = Array.from(document.querySelectorAll('.game-cell'));

function getRandomPicture(field) {
  field.forEach((elem) => {
    if (elem.classList.contains('picture')) {
      elem.classList.remove('picture');
    }
  });

  let random = Math.floor(Math.random() * field.length);

  if (randomNumber === random) {
    while (randomNumber === random) {
      random = Math.floor(Math.random() * field.length);
    }
    randomNumber = random;
    return field[randomNumber].classList.add('picture');
  }

  randomNumber = random;
  return field[randomNumber].classList.add('picture');
}

getRandomPicture(completeField);

setInterval(() => {
  getRandomPicture(completeField);
}, 2000);
