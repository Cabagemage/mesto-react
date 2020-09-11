import React from 'react';
import '../App.css';

function PopupEdit(props) {
  return (
    <div className="popup  popup_function_edit">
                <form novalidate className="popup__form popup__form_function_edit">
                    <div id='form' className="popup__container">
                        <button type="button" className="popup__close popup_close_edit"></button>
                        <h2 className="popup__edit">Редактировать профиль</h2>
                        <div className="popup__inputs">
                            <input type="text" name="name" minlength="2" maxlength="40" required
                                class="popup__input popup__input_type_name" placeholder="Имя" />
                            <span id="name-error" className="popup__input_type_error"></span>
                            <input type="text" nameName="about" minlength="2" maxlength="200" required
                                class="popup__input popup__input_type_job" placeholder="Работа" />
                            <span id="about-error" class="popup__input_type_error"></span>
                        </div>
                        <button type="submit" class="popup__save popup__save_function_edit">Сохранить</button>
                    </div>
                </form>
            </div>
  );
}

export default PopupEdit;
