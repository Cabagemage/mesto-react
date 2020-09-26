import React, { useContext } from 'react';
import '../App.css';
import Card from './Card';
import { currentUserContext } from './currentUserContext'


function Main({ onEditAvatar, onEditProfile, onCardClick, onAddPlace, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(currentUserContext)

    //возвращение разметки. Переменные userName / userDescrpiption через устанавливают соответствующие данные
    return (
        <div className="main" >
            <div className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }} alt=''></img>
                </div>
                <div className="profile__textbox">
                    <div className="profile__info">
                        {/* //прокидываю переменную userName для установки данных с сервера  */}
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" onClick={onEditProfile} className="profile__edit"></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                        {/* //прокидываю переменную userDescription для установки данных с сервера  */}
                    </div>
                </div>
                <button type="button" className="profile__add" onClick={onAddPlace}></button>
            </div>

            <section className="elements">
                {cards.map((card) => (<Card onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} card={card} onCardClick={onCardClick} />))}
            </section>


        </div>
    );
}

export default Main;