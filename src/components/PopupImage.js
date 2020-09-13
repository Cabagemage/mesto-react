import React from 'react';
import '../App.css';

function PopupImage(props) {
  return (

    <div className={`popup   popup_function_image  ${props.card ? "popup_opened" : ''}  `}>
      <div className="popup__container popup__container_function_image">
        <button type="button" className="popup__close popup__close_current_image" onClick={props.isClose}></button>
        <img className="image"   src={props.card && props.card.link} alt="" />
        <h2 className="popup__container popup__container_content_name">{props.card && props.card.name}</h2>
      </div>
    </div>
  );

}

export default PopupImage;
