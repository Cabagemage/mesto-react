import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import Card from './Card';
import { apiProfile } from '../utils/Api.js'
import { currentUserContext } from './currentUserContext'




function Main({ onEditAvatar, onEditProfile, onCardClick, onAddPlace, onCardLike }) {
    const currentUser = useContext(currentUserContext)
    const [cards, setCards] = useState([]);
    // Хуки для  изменения стейтов.
    useEffect(() => {
    apiProfile.getAppinfo().then(res => {
        const [initialCards] = res
        setCards(initialCards)
    })
}, [])
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        apiProfile.changeLikeStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });

    }

    function handleCardDelete(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке

        apiProfile.deleteThisCard(card._id).then(() => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.filter((c) => c._id === card._id ? card : c);
            // Обновляем стейт
            setCards(newCards);
        });

    }
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
                {cards.map((card) => (<Card onCardLike={handleCardLike} onCardDelete={handleCardDelete} key={card._id} card={card} onCardClick={onCardClick} />))}
            </section>


        </div>
    );
}

export default Main;