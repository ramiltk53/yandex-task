const cardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');

const createCardElement = (data) => {
  const newCardElement = cardTemplate.cloneNode(true);
  newCardElement.querySelector('.place-card__image').style.backgroundImage = 'url(' + data.link + ')';
  newCardElement.querySelector('.place-card__name').textContent = data.name;
  return newCardElement;
}

class Card {
  constructor({data, removeHandlerCallback, openHandlerCallback, likeHandlerCallback}) {
    this._removeCallback = removeHandlerCallback || (() => {});
    this._openCallback = openHandlerCallback || (() => {});
    this._likeCallback = likeHandlerCallback || (() => {});
    this._element = createCardElement(data);
    this._buttonElementToLike = this._element.querySelector('.place-card__like-icon');
    this.setView(data);
    this._setHandlers();
  }

  setView(data) {
    this.data = data;
    this._element.querySelector('.place-card__like-count').textContent = data.likes.length;
    this._element.querySelector('.place-card__delete-icon').style.display = data.currentUserId === data.owner._id ? 'block' : 'none';
    this.setLike();
  }

  get node() {
    return this._element;
  }

  get id() {
    return this.data._id;
  }

  get isLiked() {
    return Boolean(this.data.likes.find(item => item._id === this.data.currentUserId));
  }

  setLike() {
    if (this.isLiked) this._buttonElementToLike.classList.add('place-card__like-icon_liked');
    else this._buttonElementToLike.classList.remove('place-card__like-icon_liked');
  }

  open() {
    this._openCallback();
  }

  remove() {
    this._element.remove();
  }

  _setHandlers() {
    this._element.addEventListener('click', (e) => {
      e.stopPropagation();
      this.open();
    });

    this._element.querySelector('.place-card__delete-icon').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._removeCallback(this);
    });

    this._buttonElementToLike.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._likeCallback(this)
    })
  }

}

export default Card;
