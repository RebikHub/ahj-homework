export default class Liker {
  constructor() {
    this.liker = document.querySelector('#liker');
    this.button = document.querySelector('.lik-btn');
  }

  events() {
    this.button.addEventListener('click', () => {
      this.addImg();
    });
  }

  addImg() {
    const div = document.createElement('div');
    this.liker.insertBefore(div, this.button);
    div.classList.add('img');
    const random = Math.ceil(Math.random() * 4);
    div.classList.add(`heart-${random}`);
    Liker.removeImg(div);
  }

  static removeImg(element) {
    element.addEventListener('animationend', () => {
      element.remove();
    });
  }
}
