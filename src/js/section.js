import Component from './component';

class Section extends Component {
  constructor({selector, handlers = [] }) {
    super();
    this._element = document.querySelector(selector) || document.createElement('div');
    this._setHandlers(handlers)
  }

  _setHandlers(handlers) {
    handlers.forEach(({selector, eventType, callback}) => {
      Array.from(this._element.querySelectorAll(selector)).forEach(element => {
        element.addEventListener(eventType, (e) => {
          e.preventDefault();
          callback()
        })
      })
    })
  }
}

export default Section