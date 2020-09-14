import React from 'react';
import '../App.css';

function PopupWithForm({isOpen, isClose, name, form, title, children}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}   popup_function_${name} `}>
                <form noValidate className={`popup__form popup__form_function_${form}`}>
                    <div id='form' className="popup__container">
                        <button type="button" onClick={isClose} className={`popup__close popup_close_${name}`}></button>
                        <h2 className="popup__edit">{title}</h2>
                        {children}
                       
                    </div>
                </form>
            </div>
  );
}

export default PopupWithForm;