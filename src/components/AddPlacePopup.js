import React from 'react'
import PopupWithForm from './PopupWithForm'
import { currentUserContext } from './currentUserContext'
import { apiProfile } from '../utils/Api'
export default function EditProfilePopup({ isOpen, isClose, closeToOverlay, onUpdateUser }) {



    return (
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
    )
}
