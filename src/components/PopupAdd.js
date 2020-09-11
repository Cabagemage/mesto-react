import React from 'react';
import '../App.css';

function PopupAdd() {
  return (
    <div className="popup popup_function_add">
                <form novalidate className="popup__form popup__form_function_add">
                    <div className="popup__container">
                        <button type="button" className="popup__close popup_close_add"></button>
                        <h2 className="popup__edit">Новое место</h2>
                        <div className="popup__inputs">
                            <input type="text" name="name" required minlength="1" maxlength="30"
                                className="popup__input popup__input_type_place" placeholder="Место" />
                            <span id="place-error" className="popup__input_type_error"></span>
                            <input type="url" name="link" required className="popup__input popup__input_type_link"
                                placeholder="Ссылка" />
                            <span id="link-error" className="popup__input_type_error"></span>
                        </div>

                        <button type="submit" className="popup__save   popup__save_function_create">Создать</button>
                    </div>
                </form>
            </div>
  );
}

export default PopupAdd;
