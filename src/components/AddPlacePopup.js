import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, isClose, closeToOverlay, onSubmit }) {

    const [placeValues, setFormValues] = React.useState({
        name: '',
        link: ''
    })

    const [formValidity, setFormValidity] = React.useState({
        nameValid: false,
        linkValid: false,
    })


    const handleInputChange = React.useCallback((e) =>{
        const {name, value} = e.target;
        setFormValues(prevState => ({...prevState, [name]:value}))
    }, [setFormValues])


    const {name, link} = placeValues
    const {nameValid, linkValid} = formValidity
    const isSubmitDisabled =!nameValid || !linkValid
    const nameRef = React.useRef('')
    const imageRef = React.useRef('')

    React.useEffect(function validateInpus(){
        const isNameFilled = placeValues.name.length > 2;
        const isNameValid = isNameFilled;

        const isLinkFilled = placeValues.link.length > 10;
        const isLinkValid = isLinkFilled;
        setFormValidity(prevValidity => ({
         nameValid: isNameValid,
         linkValid: isLinkValid
        }))
    }, [placeValues, setFormValidity])

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
                    {!nameValid && <p class="popup__input_type_error">Введите название</p>}
                    {!linkValid && <p class="error">Введите ссылку</p>}
                        <input

                            type="text"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
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
                            value={link}
                            onChange={handleInputChange}
                            ref={imageRef}
                            required className="popup__input popup__input_type_link"
                            placeholder="Ссылка" />

                        <span
                            id="link-error"
                            className="popup__input_type_error"></span>
                    </div>
                    <button
                        disabled={isSubmitDisabled}
                        type="submit"
                        onClick={handleSubmit}
                        className="popup__save   popup__save_function_create">Создать</button>
                </>
            }
        />
    )
}
