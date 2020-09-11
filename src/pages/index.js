import './index.css';

import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupButtonEdit,
  popupButtonAdd,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  inputName,
  inputJob,
  config
}
  from '../utils/constants.js'
import { buttonPreloader, pagePreloader } from '../utils/preloader.js'
import { data } from 'jquery';

const formValidAdd = new FormValidator(config, formElementAdd);
formValidAdd.enableValidation();
const formValidEdit = new FormValidator(config, formElementEdit);
formValidEdit.enableValidation();
const formValidAvatar = new FormValidator(config, formElementAvatar);
formValidAvatar.enableValidation();




const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '60dbe103-3bf7-4b68-8dd7-d41370d9694c',
    'Content-Type': 'application/json'
  }

});

pagePreloader(true);
api.getAppinfo().then(res => {
  const [initialCards, info] = res

  const userInformation = new UserInfo({
    name: '.profile__name',
    about: '.profile__subtitle',
    avatar: '.profile__image',
  });

  userInformation.setUserInfo({
    name: info.name,
    about: info.about,
    userId: info._id,
  });
  userInformation.setUserAvatar(info.avatar)



  function createNewCard(data, toAppend) {



    const card = new Card(
      {
        userId: info._id,
        data: {
          name: data.name,
          link: data.link,
          owner: data.owner._id,
          likes: data.likes
        },
        handleCardClick: () => {
          popupImage.open(data)
        },

        handleLikeClick: () => {
          api.putLikeToCard(data._id, info._id)
            .then(data => {
              card.updateLikes(data.likes);
              card.toggleLike();
            });
        },
        handleDislikeClick: () => {
          api.deleteLikeOfCard(data._id, info._id) //юзерайди
            .then(data => {
              card.updateLikes(data.likes);//юзерайди
              card.toggleLike();
            })

        },
        handleDeleteIconClick: () => {
          removePopup.open()
          removePopup.setSubmitAction(() => {
            api.deleteThisCard(data._id)
              .then(id => {
                removePopup.close()
                card.handleRemoveCard();
              })
          })
        },
      }, '.grid-card-template');

    if (toAppend) {
      defaultSection.addItemAppend(card.generateCard())
    }
    else { defaultSection.addItemPrepend(card.generateCard()) }
  }

  const defaultSection = new Section(
    {
      items: initialCards,
      renderer: (item) => { createNewCard(item, true) }
    }, '.elements');
  defaultSection.render()

  const popupImage = new PopupWithImage('.popup_function_image')
  const removePopup = new PopupWithSubmit('.popup_function_remove')



  const avatarPopupOpen = document.querySelector('.profile__avatar')
  avatarPopupOpen.addEventListener('click', () => {
    popupAvatar.open()
    formValidAvatar.disableButton();
  })

  const popupAvatar = new PopupWithForm('.popup_function_avatar',
    {
      handleFormSubmit: (data) => {
        buttonPreloader(true, '.popup__save_function_create')
        api.changeProfileAvatar(data.avatar)
          .then(res => {
            userInformation.setUserAvatar(res.avatar)
            formValidAvatar.disableButton()
            popupAvatar.close()
          }).catch(err => console.log(err))
          .finally(_ => buttonPreloader(false, '.popup__save_function_create'))
      }
    })

  const popupToEdit = new PopupWithForm('.popup_function_edit',
    {
      handleFormSubmit: (data) => {
        buttonPreloader(true, '.popup__save_function_edit')
        api.setUserInfo(data.name, data.about).then(res => {
          userInformation.setUserInfo(res);
          popupToEdit.close()
        })
          .finally(_ => buttonPreloader(false, '.popup__save_function_edit'))
      }
    })


  popupButtonEdit.addEventListener('click', () => {
    popupToEdit.open()
    api.getUserInformation().then(res => {
      inputName.value = res.name;
      inputJob.value = res.about;
      formValidEdit.enableButton();
    })
  })



  return {
    createNewCard,
    popupAvatar,
    userInformation,
    popupToEdit,
    defaultSection,
    popupImage,
    removePopup
  }

})
  .then(res => {
    const {
      popupAvatar,
      popupToEdit,
      popupImage,
      removePopup,
      createNewCard } = res;

    popupButtonAdd.addEventListener('click', () => {
      popupAdd.open();
      formValidAdd.disableButton()
    })

    const popupAdd = new PopupWithForm('.popup_function_add',
      {
        handleFormSubmit: (data) => {
          buttonPreloader(true, '.popup__save_function_create')
          api.postNewCard(data).then((res) => {
            createNewCard(res, false)
            popupAdd.close();
          }).finally(_ => buttonPreloader(false, '.popup__save_function_create'))
        }
      })



    popupAdd.setEventListeners()
    popupAvatar.setEventListeners()
    popupToEdit.setEventListeners()
    popupImage.setEventListeners()
    removePopup.setEventListeners();
  }).catch(err => console.log(err))
  .finally(_ => pagePreloader(false))












