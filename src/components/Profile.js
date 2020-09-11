import React from 'react';
import '../App.css';


function Profile(props) {
  return (
    <div className="profile">
    <div className="profile__avatar">
        <img className="profile__image" alt='' ></img>
    </div>
    <div className="profile__textbox">
        <div className="profile__info">
            <h1 className="profile__name"></h1>
            <button type="button" onClick = {props.onClick} className="profile__edit"></button>
            <p className="profile__subtitle"></p>
        </div>
    </div>
    <button type="button" className="profile__add"></button>
</div>
  );
}

export default Profile;
