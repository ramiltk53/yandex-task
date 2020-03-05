import Popup from './popup';

class PopupWithForm extends Popup {
  constructor(selector, container) {
    super(selector, container);
    this._submitCallback = () => {};
  }

  _setEventListeners() {
    super._setEventListeners();
    this._inputs = Array.from(this._element.querySelectorAll('.js-popup-input'));
    this._errorMessageElements = Array.from(this._element.querySelectorAll('.popup__error-message'));

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validateInputElement(inputElement)
      })
    });

    const submitButton = this._element.querySelector('.popup__button');
    submitButton.addEventListener('click', e => {
      e.preventDefault();
      const newCardInfo = this._getInfo();
      this._submitCallback(newCardInfo);
      this.close();
    });
  }

  _validateInputElement(inputElement) {
    const errorMessageElement = this._errorMessageElements.find(element => element.dataset.forElement === inputElement.name);
    if (!inputElement.validity.valid) {
      errorMessageElement.classList.remove('visually-hidden')
    } else {
      errorMessageElement.classList.add('visually-hidden')
    }
  }

  _clear() {
    this._inputs.forEach((inputElement) => {
      inputElement.value = '';
      const errorMessageElement = this._errorMessageElements.find(element => element.dataset.forElement === inputElement.name);
      errorMessageElement.classList.add('visually-hidden');
    });
  }

  open(data = {}) {
    super.open();
    this._setInfo(data);
  }

  close() {
    super.close();
    this._clear();
  }

  _setInfo(data) {
    Object.keys(data).forEach(inputName => {
      const element = this._inputs.find(element => element.name === inputName)
      if (element) element.value = data[inputName];
    });
  }

  _getInfo() {
    return this._inputs.reduce((info, input) => {
      info[input.name] = input.value;
      return info;
    }, {});
  }

  setSubmitCallback(cb) {
    this._submitCallback = cb;
  }
}

export default PopupWithForm;