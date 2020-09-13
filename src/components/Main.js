import React from 'react';
import '../App.css';
import GridTemplate from '../components/GridTemplate';
import { apiProfile } from '../utils/Api.js'
function Main(props) {
// Хуки для  получения данных
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserInfo] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([]);
// Хуки для "подключения" данных с сервера.
    React.useEffect(() => {
        apiProfile.getUserInformation()
            .then((data) => {
                setUserName(data.name)
                setUserInfo(data.about)
                setUserAvatar(data.avatar)
            })
    }, [])

    React.useEffect(() => {
        apiProfile.getInitialCards()
            .then((cards) => {
                setCards(cards)
            })
    }, [])
//возвращение разметки. Переменные userName / userDescrpiption через устанавливают соответствующие данные
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
                {cards.map((card, i) => (<GridTemplate key={i} card={card} onCardClick={props.onCardClick} />))}
            </section>


        </div>
    );
}

export default Main;