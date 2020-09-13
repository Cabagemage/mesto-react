import React from 'react';
import '../App.css';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}   popup_function_${props.name} `}>
                <form noValidate className={`popup__form popup__form_function_${props.form}`}>
                    <div id='form' className="popup__container">
                        <button type="button" onClick={props.isClose} className={`popup__close popup_close_${props.name}`}></button>
                        <h2 className="popup__edit">{props.title}</h2>
                        {props.children}
                       
                    </div>
                </form>
            </div>
  );
}

export default PopupWithForm;