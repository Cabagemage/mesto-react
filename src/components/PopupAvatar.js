import React from 'react';
import '../App.css';

function PopupAvatar() {
    return (
        <div className="popup popup_function_avatar">
            <form novalidate className="popup__form popup__form_function_avatar">
                <div className="popup__container">
                    <button type="button" className="popup__close popup_close_avatar"></button>
                    <h2 className="popup__edit">Обновить аватар</h2>
                    <div className="popup__inputs">
                        <input type="url" name="avatar" required className="popup__input popup__input_type_link"
                            placeholder="Ссылка" />
                        <span id="avatar-error" className="popup__input_type_error"></span>
                    </div>
                    <button type="submit" className="popup__save   popup__save_function_create">Обновить</button>
                </div>
            </form>
        </div>
    );
}

export default PopupAvatar;
