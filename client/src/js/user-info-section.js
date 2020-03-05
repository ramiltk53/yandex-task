import Section from './section'
class UserInfoSection extends Section {
  constructor(...props) {
    super(...props);
    this._nameElement = this._element.querySelector('.user-info__name');
    this._aboutElement = this._element.querySelector('.user-info__job');
    this._avatarElement = this._element.querySelector('.user-info__photo');
    this.data = {}
  }

  setData(info = this.data) {
    this.data = info;
    if (info.name) this._nameElement.textContent = info.name;
    if (info.about) this._aboutElement.textContent = info.about;
    if (info.avatar) this._avatarElement.style.backgroundImage = `url(${info.avatar})`;
  }

  getInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.style.backgroundImage.slice(5, -2)
    }
  }
}

export default UserInfoSection