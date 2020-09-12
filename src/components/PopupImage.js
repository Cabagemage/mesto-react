import React from 'react';
import '../App.css';

function PopupImage(props) {
  return (
    
    <div className={`popup ${props.card ? "popup_opened" : ""}   popup_function_${props.name} `}>
        
                <div className={`popup__container popup__container_function_${props.name}`}>
                    <button type="button" className="popup__close popup__close_current_image" onClick={props.isClose}></button>
                    <img className="image"  alt="" src={props.card.link} onClick={handleClick}/>
                    <h2 className="popup__container popup__container_content_name">{props.card.name}</h2>
                </div>
            </div>
  );
  function handleClick() {
    props.onCardClick(props.card);
    console.log('test')
  } 
}

export default PopupImage;
