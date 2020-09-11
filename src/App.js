import React from 'react';
import './App.css';
import Header from './components/Header'
import Main from  './components/Main'
import Footer from './components/Footer'
import PopupWithForm from './components/PopupWithForm'

function App() {

  const handleEditClick = () => {
    setEditProfilePopupOpen(true)
}
const handleAddClick = () => {
  setAddImagePopupOpen(true)
}
const handleAvatarClick = () => {
  setChangeAvatarPopupOpen(true)
}
const closeAllPopups = () => {
  setChangeAvatarPopupOpen(false)
  setEditProfilePopupOpen(false)
  setAddImagePopupOpen(false)
}

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddImagePopupOpen, setAddImagePopupOpen] = React.useState(false);
  const [isChangeAvatarPopupOpen, setChangeAvatarPopupOpen] = React.useState(false);
  return (
    <div className="page" >
       <Header />
       <Main 
      onEditProfile = {handleEditClick}
      onAddPlace  = {handleAddClick}
      onEditAvatar = {handleAvatarClick}
      />

      <PopupWithForm
      name="edit"
      form="edit" 
      title='Редактировать профиль'
      isOpen={isEditProfilePopupOpen}
      isClose={closeAllPopups}
      children={
          <>
              <div className="popup__inputs">
                  <input type="text" name="name" minlength="2" maxlength="40" required
                      class="popup__input popup__input_type_name" placeholder="Имя" />
                  <span id="name-error" className="popup__input_type_error"></span>
                  <input type="text" nameName="about" minlength="2" maxlength="200" required
                      class="popup__input popup__input_type_job" placeholder="Работа" />
                  <span id="about-error" class="popup__input_type_error"></span>
              </div>
              <button type="submit" class="popup__save popup__save_function_edit">Сохранить</button>
          </>
      }
      />
  <PopupWithForm
      name="add"
      form="add" 
      title='Новое место' 
      isOpen={isAddImagePopupOpen}
      isClose={closeAllPopups}
      children={
          <>
              <div className="popup__inputs">
                  <input type="text" name="name" required minlength="1" maxlength="30"
                      className="popup__input popup__input_type_place" placeholder="Место" />
                  <span id="place-error" className="popup__input_type_error"></span>
                  <input type="url" name="link" required className="popup__input popup__input_type_link"
                      placeholder="Ссылка" />
                  <span id="link-error" className="popup__input_type_error"></span>
              </div>

              <button type="submit" className="popup__save   popup__save_function_create">Создать</button>
          </>
      }
  />

  <PopupWithForm
      name="avatar"
      form="avatar" 
      title='Обновить аватар'
      isClose={closeAllPopups}
      popupCloseName="avatar"
      isOpen={isChangeAvatarPopupOpen}
       children={
          <>
              <div className="popup__inputs">
                  <input type="url" name="avatar" required className="popup__input popup__input_type_link"
                      placeholder="Ссылка" />
                  <span id="avatar-error" className="popup__input_type_error"></span>
              </div>
              <button type="submit" className="popup__save   popup__save_function_create">Обновить</button>
          </>
      }
  />
      
       
       <Footer />

       
    </div>
  );
}

export default App;
