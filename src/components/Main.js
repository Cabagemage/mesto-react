import React from 'react';
import Profile from '../components/Profile';
import Elements from '../components/Elements';
import '../App.css';
import PopupImage from '../components/PopupImage'
import PopupWithForm from '../components/PopupWithForm'

import { apiProfile } from '../utils/Api.js'
function Main(props) {

    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserInfo] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        apiProfile.getUserInformation()
            .then((data) => {
                setUserName(data.name)
                setUserInfo(data.about)
                setUserAvatar(data.avatar)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }, [])
    React.useEffect(() => {
        apiProfile.getInitialCards()
            .then((data) => {
                cards(data)
            })
            .catch((err) => {
                console.log(err) // выведем ошибку в консоль
            })
    }, [])
    return (
        <div className="main" >
            <div className="profile">
                <div className="profile__avatar" onClick={props.onEditAvatar}>
                    <img className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }} alt=''></img>
                </div>
                <div className="profile__textbox">
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" onClick={props.onEditProfile} className="profile__edit"></button>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button type="button" className="profile__add" onClick={props.onAddPlace}></button>
            </div>
            {/* <section className="elements">
                {cards.map(item => {
                <div className="grid-card">
                    <img className="grid-card__photo" style={{ backgroundImage: `url(${props.link})` }} alt="" />
                    <button className="grid-card__remove"></button>
                    <div className="grid-card__textbox">
                        <h2 className="grid-card__title">`${props.link}`</h2>
                        <div className="grid-card__like-section">
                            <button type="button" className="grid-card__like-button like-button_like_active"></button>
                            <p className="grid-card__like-counter">`${item.likes}</p>
                        </div>
                    </div>
                    </div>
                    }) 
                    }
            </section> */}
                <PopupImage />
        </div>

    );
}

export default Main;