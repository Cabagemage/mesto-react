import React from 'react';
import '../App.css';

function PopupImage() {
  return (
    <div className="popup popup_function_image">
                <div className="popup__container popup__container_function_image">
                    <button type="button" className="popup__close popup__close_current_image"></button>
                    <img className="image" alt="" />
                    <h2 className="popup__container popup__container_content_name"></h2>
                </div>
            </div>
  );
}

export default PopupImage;