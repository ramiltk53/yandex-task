class Api {
  constructor({address, token, groupId}) {
    this.token = token;
    this.groupId = groupId;
    this.address = address;
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  getCards() {
    return fetch(`${this.address}/${this.groupId}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка загрузки карточек!'))
  }

  addNewCard({name, link}) {
    return fetch(`${this.address}/${this.groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка!'));
  }

  deleteCard(cardID) {
    return fetch(`${this.address}/${this.groupId}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка!'));
  }

  getUserInfo() {
    return fetch(`${this.address}/${this.groupId}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка загрузки и информации пользователя!'))
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.address}/${this.groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка!'));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this.address}/${this.groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch((e) => alert('Ошибка!'));
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this.address}/${this.groupId}/cards/like/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка!'));
  }
}

export default Api;
