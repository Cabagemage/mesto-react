import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, isClose, closeToOverlay, onSubmit }) {

    const nameRef = React.useRef('')
    const imageRef = React.useRef('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name: nameRef.current.value, link: imageRef.current.value });
    }

    return (
        <PopupWithForm
            name="add"
            form="add"
            title='Новое место'
            isOpen={isOpen}
            isClose={isClose}
            closeToOverlay={closeToOverlay}
            children={
                <>
                    <div className="popup__inputs">
                        <input
                            type="text"
                            name="name"
                            ref={nameRef}
                            required minLength="1"
                            maxLength="30"
                            className="popup__input popup__input_type_place"
                            placeholder="Место" />
                        <span
                            id="place-error"
                            className="popup__input_type_error"></span>
                        <input
                            type="url"
                            name="link"
                            ref={imageRef}
                            required className="popup__input popup__input_type_link"
                            placeholder="Ссылка" />

                        <span
                            id="link-error"
                            className="popup__input_type_error"></span>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="popup__save   popup__save_function_create">Создать</button>
                </>
            }
        />
    )
}
