import React from 'react';
import '../App.css';

function GridTemplate({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
    console.log(card)
  }
  return (
    <div className="grid-card">
      <img className="grid-card__photo" src={card.link} alt="" onClick={handleClick} />
      <button className="grid-card__remove"></button>
      <div className="grid-card__textbox">
        <h2 className="grid-card__title">{card.name}</h2>
        <div className="grid-card__like-section">
          <button type="button" className="grid-card__like-button like-button_like_active"></button>
          <p className="grid-card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );

}


export default GridTemplate;