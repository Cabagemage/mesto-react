import React, { useContext } from "react";
import "../App.css";
import { currentUserContext } from "../contexts/currentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(currentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `grid-card__remove ${
    isOwn ? "grid-card__remove" : "grid-card__remove-none"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `grid-card__like-button ${
    isLiked ? "grid-card__like-button_like_active" : "grid-card__like-button"
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="grid-card">
      <img
        className="grid-card__photo"
        src={card.link}
        alt=""
        onClick={handleClick}
      />
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <div className="grid-card__textbox">
        <h2 className="grid-card__title">{card.name}</h2>
        <div className="grid-card__like-section">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p className="grid-card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
