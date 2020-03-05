import './pages/index.css';
import PopupWithForm from './js/popup-with-form';
import PicturePopup from './js/picture-popup';
import UserInfoSection from './js/user-info-section';
import CardListSection from './js/card-list-section';
import Api from './js/api';
const rootElement = document.querySelector('.root');

const api = new Api({
  address: NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk',
  groupId: `cohort0`,
  token: `80a75492-21c5-4330-a02f-308029e94b63`,
});


api.getAppInfo()
  .then(([cardsInfo, userInfo]) => {
    const newCardPopup = new PopupWithForm('#new-card-popup-template', rootElement);
    const userInfoPopup = new PopupWithForm('#user-info-popup-template', rootElement);
    const picturePopup = new PicturePopup('#picture-popup-template', rootElement);
    const avatarPopup = new PopupWithForm('#avatar-popup-template', rootElement);

    userInfoPopup.setSubmitCallback((info) => {
      api.setUserInfo(info)
        .then(data => userInfoSection.setData(data))
        .catch(e => userInfoSection.setData());
    });

    avatarPopup.setSubmitCallback((info) => {
      api.setUserAvatar(info)
        .then(data => userInfoSection.setData(data))
        .catch(e => userInfoSection.setData());
    });

    newCardPopup.setSubmitCallback((newCardInfo) => {
      api.addNewCard(newCardInfo)
        .then(data => {
          cardsInfo.push(data);
          cardListSection.setData(getCardData(data));
        })
    });

    const cardListSection = new CardListSection({
      selector: '.places-list'
    });

    const userInfoSection = new UserInfoSection({
      selector: '.profile',
      handlers: [
        {
          selector: '.user-info__button_edit',
          eventType: 'click',
          callback: () => userInfoPopup.open(userInfoSection.getInfo())
        },
        {
          selector: '.user-info__button_add',
          eventType: 'click',
          callback: () => newCardPopup.open()
        },
        {
          selector: '.user-info__photo',
          eventType: 'click',
          callback: () => avatarPopup.open(userInfoSection.getInfo())
        }
      ]
    });

    const getCardData = (cardInfo) => {
      return {
        data: {...cardInfo, currentUserId: userInfo._id},
        removeHandlerCallback: (card) => {
          api.deleteCard(card.id)
            .then(() => {
              cardsInfo = cardsInfo.filter(item => {
                return item._id !== cardInfo._id;
              });
              card.remove()
            })
        },
        openHandlerCallback: () => {
          picturePopup.open(cardInfo.link);
          return picturePopup
        },
        likeHandlerCallback: (card) => {
          api.changeLikeCardStatus(card.id, !card.isLiked)
            .then(data => {
              const index = cardsInfo.findIndex(item => item._id === card.id);
              cardsInfo.splice(index, 1, data);
              card.setView({...data, currentUserId: userInfo._id});
            })
        }
      }
    };

    cardListSection.setData(cardsInfo.map(item => getCardData(item)));
    userInfoSection.setData(userInfo);
  });

