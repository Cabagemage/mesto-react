import React from 'react';
import Profile from '../components/Profile';
import Elements from '../components/Elements';
import '../App.css';
import PopupImage from '../components/PopupImage'
import PopupWithForm from '../components/PopupWithForm'
import GridTemplate from '../components/GridTemplate';
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
                console.log(err) 
            })
    }, [])

    React.useEffect(() => {
        apiProfile.getInitialCards()
            .then((cards) => {
                setCards(cards) //Вывод карточек
            })
            .catch((err) => {
                console.log(err) 
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
                    {/* //прокидываю переменную userName для установки данных с сервера  */}
                        <h1 className="profile__name">{userName}</h1> 
                        <button type="button" onClick={props.onEditProfile} className="profile__edit"></button>
                        <p className="profile__subtitle">{userDescription}</p>
                        {/* //прокидываю переменную userDescription для установки данных с сервера  */}
                    </div>
                </div>
                <button type="button" className="profile__add" onClick={props.onAddPlace}></button>
            </div>
            
            <section className="elements">
                {cards.map(card => (
                <GridTemplate key = {card.key} name={card.name} link={card.link} onCardClick={card.onCardClick} />))}
            </section>

                
        </div>
    );
}

export default Main;