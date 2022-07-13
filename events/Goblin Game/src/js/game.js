export default class GameGoblin {
  constructor() {
    this.point = 0;
    this.goblins = 0;
    this.randomNumber = null;
    this.gameField = null;
  }

  renderApp() {
    this.gameField = document.getElementById('game');
    const points = document.createElement('div');
    const goblin = document.createElement('div');
    goblin.classList.add('goblin', 'points');
    points.classList.add('points', 'points');
    this.gameField.insertAdjacentElement('afterend', points);
    points.insertAdjacentElement('afterend', goblin);
    this.gameField.classList.add('cursor');

    for (let i = 1; i < 17; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('game-cell');
      this.gameField.appendChild(cell);
    }
    document.querySelector('.points').textContent = `Points: ${this.point}`;
    document.querySelector('.goblin').textContent = `Missed the goblins: ${this.goblins}`;
  }

  winOrLose() {
    if (this.goblins > 4) {
      alert('You Lose!');
      this.goblins = 0;
      this.point = 0;
    }
    if (this.point > 20) {
      alert('You Win!');
      this.goblins = 0;
      this.point = 0;
    }
  }

  getRandomPicture(field) {
    field.forEach((elem) => {
      if (elem.classList.contains('picture')) {
        elem.classList.remove('picture');
        this.goblins += 1;
        this.winOrLose();
        document.querySelector('.goblin').textContent = `Missed the goblins: ${this.goblins}`;
      }
    });

    let random = Math.floor(Math.random() * field.length);

    if (this.randomNumber === random) {
      while (this.randomNumber === random) {
        random = Math.floor(Math.random() * field.length);
      }
      this.randomNumber = random;
      return field[this.randomNumber].classList.add('picture');
    }

    this.randomNumber = random;
    return field[this.randomNumber].classList.add('picture');
  }

  gameClick(field) {
    field.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (elem.classList.contains('picture')) {
          elem.classList.remove('picture');
          this.point += 1;
          this.winOrLose();
          document.querySelector('.points').textContent = `Points: ${this.point}`;
        } else if (!elem.classList.contains('picture')) {
          this.goblins += 1;
          this.winOrLose();
          document.querySelector('.goblin').textContent = `Missed the goblins: ${this.goblins}`;
        }
      });
    });
  }
}
