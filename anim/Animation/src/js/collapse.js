export default class Collapse {
  constructor() {
    this.button = document.querySelector('.col-btn');
    this.div = document.querySelector('.col-div');
  }

  events() {
    this.button.addEventListener('click', () => {
      const height = this.div.scrollHeight;

      if (this.div.style.height === `${height}px`) {
        this.div.style = null;
      } else {
        this.div.style.height = `${height}px`;
      }
    });
  }
}
