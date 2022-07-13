import { luhnAlgorithm, validateNumber } from './validate';

export default class Widget {
  constructor() {
    this.validator = document.querySelector('#validator');
    this.inputNumber = null;
  }

  renderDom() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const title = document.createElement('h3');
    const list = document.createElement('ul');
    const li = document.createElement('li');
    title.textContent = 'Check your credit card number';
    button.textContent = 'Click to Validate';
    button.type = 'button';
    input.type = 'text';
    input.placeholder = 'Credit card number';
    this.validator.appendChild(form);
    form.appendChild(title);
    form.appendChild(list);
    list.appendChild(li);
    for (let i = 0; i < 6; i += 1) {
      list.appendChild(li.cloneNode());
    }
    const cardsLi = document.querySelectorAll('li');
    cardsLi[0].classList.add('card', 'visa');
    cardsLi[1].classList.add('card', 'master-card');
    cardsLi[2].classList.add('card', 'american-express');
    cardsLi[3].classList.add('card', 'jcb');
    cardsLi[4].classList.add('card', 'maestro');
    cardsLi[5].classList.add('card', 'discover');
    cardsLi[6].classList.add('card', 'mir');
    form.appendChild(input);
    form.appendChild(button);

    this.inputValue();
  }

  inputValue() {
    const input = document.querySelector('input');
    const button = document.querySelector('button');

    input.addEventListener('input', (e) => {
      this.inputNumber = e.target.value;
      Widget.checkPaymentSystem(this.inputNumber);
    });
    button.addEventListener('click', () => {
      Widget.checkValidate(this.inputNumber);
    });
  }

  static checkValidate(number) {
    const valid = luhnAlgorithm(number);
    const input = document.querySelector('input');

    if (input.classList.contains('valid') || input.classList.contains('not-valid')) {
      input.classList.remove('valid');
      input.classList.remove('not-valid');
    }
    if (valid) {
      input.classList.add('valid');
    } else {
      input.classList.add('not-valid');
    }
  }

  static checkPaymentSystem(number) {
    const paySystem = validateNumber(number);
    const listPaySystem = document.querySelectorAll('.card');

    for (const i of listPaySystem) {
      if (i.classList.contains(`${paySystem}`)) {
        i.classList.remove('disable');
      } else {
        i.classList.add('disable');
      }
    }
  }
}
