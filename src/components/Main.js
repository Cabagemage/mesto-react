import React, {useState, useEffect, useContext} from 'react';
import '../App.css';
import Card from './Card';
import { apiProfile } from '../utils/Api.js'
import {currentUserContext} from './currentUserContext'
function Main({onEditAvatar, onEditProfile, onCardClick, onAddPlace}) {
   const currentUser = useContext(currentUserContext)

    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([]);
// Хуки для  изменения стейтов.
        apiProfile.getAppinfo().then(res => {
        const [initialCards, info] = res
                setCards(initialCards)
        })

//возвращение разметки. Переменные userName / userDescrpiption через устанавливают соответствующие данные
    return (
        <div className="main" >
            <div className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }} alt=''></img>
                </div>
                <div className="profile__textbox">
                    <div className="profile__info">
                        {/* //прокидываю переменную userName для установки данных с сервера  */}
                        <h1 className="profile__name">{currentUser.value.name}</h1>
                        <button type="button" onClick={onEditProfile} className="profile__edit"></button>
                        <p className="profile__subtitle">{currentUser.value.about}</p>
                        {/* //прокидываю переменную userDescription для установки данных с сервера  */}
                    </div>
                </div>
                <button type="button" className="profile__add" onClick={onAddPlace}></button>
            </div>

            <section className="elements">
                {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} />))}
            </section>


        </div>
    );
}

export default Main;