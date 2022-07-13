export default class CallbackChat {
  constructor() {
    this.button = document.querySelector('.call-btn');
    this.form = document.querySelector('.call-form');
    this.formClose = document.querySelector('.call-form-close');
    this.formButton = document.querySelector('.call-form-btn');
  }

  events() {
    this.redButtonClick();
    this.closeClick(this.formClose);
    this.closeClick(this.formButton);
  }

  redButtonClick() {
    this.button.addEventListener('click', () => {
      if (this.form.classList.contains('none')) {
        this.form.classList.remove('none');
        this.button.classList.add('none');
      }
    });
  }

  closeClick(element) {
    element.addEventListener('click', () => {
      if (!this.form.classList.contains('none')) {
        this.form.classList.add('none');
        this.button.classList.remove('none');
      }
    });
  }
}
