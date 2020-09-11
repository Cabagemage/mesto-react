import React from 'react';
import '../App.css';

function GridTemplate(props) {
  return (

    <div className="grid-card">
        <img className="grid-card__photo" style={{ backgroundImage: `url(${props.link})` }} alt="" />
        <button className="grid-card__remove"></button>
        <div className="grid-card__textbox">
            <h2 className="grid-card__title">`${props.link}`</h2>
            <div className="grid-card__like-section">
                <button type="button" className="grid-card__like-button like-button_like_active"></button>
                <p className="grid-card__like-counter">`${props.likes}</p>
            </div>
        </div>
       
    </div>
     })
  );
}

export default GridTemplate;