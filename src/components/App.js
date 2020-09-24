import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import PopupImage from './PopupImage'
import { apiProfile } from '../utils/Api.js'
import {currentUserContext} from './currentUserContext'
// Если вы читаете это сообщение, значит проектная работа была отправлена, а 
// автор работы находится в глубоком экзистенциальном кризисе, и после реакта, скорее всего, очень пьян.
// Почему для реализации этого функционала на нативном ДжаваСкрипте я сидел столькими бессонными ночами, плакал и бился головой об стену 
// Если реакт делает тоже самое, но так изящно, что даже представить себе сложно. 
// Конец записи.  


function App() {
    const [currentUser, setCurrentUser] = useState({})
    
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddImagePopupOpen, setAddImagePopupOpen] = useState(false);
    const [isChangeAvatarPopupOpen, setChangeAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    useEffect(() =>{
    apiProfile.getUserInformation().
    then(res => 
            setCurrentUser(res)
        )
    }, [])
    const handleOverlayClose = e => {
            if (e.target !== e.currentTarget) { return }
            closeAllPopups();
    }

//   const handleEscClose = () => {
//     document.addEventListener('keyup', (e) => {
//         if (e.keyCode === 27) closeAllPopups();
//     });
//   }
    const handleEditClick = () => {
        setEditProfilePopupOpen(true)
    }
    const handleAddClick = () => {
        setAddImagePopupOpen(true)
    }
    const handleAvatarClick = () => {
        setChangeAvatarPopupOpen(true)
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }
    const closeAllPopups = () => {
        setChangeAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddImagePopupOpen(false)
        setSelectedCard(null)
    }

    return (
        <div className="page" >
            <currentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                onEditProfile={handleEditClick}
                onAddPlace={handleAddClick}
                onEditAvatar={handleAvatarClick}
                onCardClick={handleCardClick}
            />
            <PopupWithForm
                name="edit"
                form="edit"
                title='Редактировать профиль'
                isOpen={isEditProfilePopupOpen}
                isClose={closeAllPopups}
                closeToOverlay={handleOverlayClose}
                children={
                    <>
                        <div className="popup__inputs">
                            <input type="text" name="name" minLength="2" maxLength="40" required
                                className="popup__input popup__input_type_name" placeholder="Имя" />
                            <span id="name-error" className="popup__input_type_error"></span>
                            <input type="text" name="about" minLength="2" maxLength="200" required
                                className="popup__input popup__input_type_job" placeholder="Работа" />
                            <span id="about-error" className="popup__input_type_error"></span>
                        </div>
                        <button type="submit" className="popup__save popup__save_function_edit">Сохранить</button>
                    </>
                }
            />
            <PopupWithForm
                name="add"
                form="add"
                title='Новое место'
                isOpen={isAddImagePopupOpen}
                isClose={closeAllPopups}
                closeToOverlay={handleOverlayClose}
                children={
                    <>
                        <div className="popup__inputs">
                            <input type="text" name="name" required minLength="1" maxLength="30"
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
                closeToOverlay={handleOverlayClose}
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
            <PopupImage
                card={selectedCard}
                isClose={closeAllPopups}
                closeToOverlay={handleOverlayClose}
            />
            <Footer />
            </currentUserContext.Provider>
        </div>
    );
}

export default App;
