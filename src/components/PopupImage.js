import React from "react";
import "../App.css";

function PopupImage({ card, isClose, closeToOverlay }) {
  return (
    <div
      className={`popup   popup_function_image ${card && "popup_opened"}  `}
      onClick={closeToOverlay}
    >
      <div className="popup__container popup__container_function_image">
        <button
          type="button"
          className="popup__close popup__close_current_image"
          onClick={isClose}
        ></button>
        <img className="image" src={card && card.link} alt="" />
        <h2 className="popup__container popup__container_content_name">
          {card && card.name}
        </h2>
      </div>
    </div>
  );
}

export default PopupImage;
