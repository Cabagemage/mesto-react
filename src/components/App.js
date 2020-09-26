import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import PopupImage from './PopupImage'
import { apiProfile } from '../utils/Api.js'
import { currentUserContext } from './currentUserContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'



function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddImagePopupOpen, setAddImagePopupOpen] = useState(false);
    const [isChangeAvatarPopupOpen, setChangeAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        apiProfile.getUserInformation().
            then(res =>
                setCurrentUser(res),
            )
    }, [setCurrentUser])

    const handleOverlayClose = e => {
        if (e.target !== e.currentTarget) { return }
        closeAllPopups();
    }

    const handleUpdateUser = (user) => {
        apiProfile.setUserInfo(user).then(res => {
            setCurrentUser(res)
            closeAllPopups()
        })
    }

    const handleUpdateAvatar = (url) => {
        apiProfile.changeProfileAvatar(url).then(res => {
            setCurrentUser(res)
            closeAllPopups()
        })
    }
    // const handleEscClose = () => {
    //   document.addEventListener('keyup', (e) => {
    //     if (e.key === 'escape') closeAllPopups();
    //    });
    //  }


    useEffect(() => {
        apiProfile.getInitialCards().then(res => {
            setCards(res)
        }, [cards])
    })

    const handleAddPlaceSubmit = (name, link) => {
        apiProfile.postNewCard(name, link).then(data => {
            setCards([...cards, data]);
            closeAllPopups()
        });

    }
    const handleEditClick = () => {
        setEditProfilePopupOpen(true)
    }
    const handleAddClick = () => {
        setAddImagePopupOpen(true)
    }
    const handleAvatarClick = () => {
        setChangeAvatarPopupOpen(true)
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }
    const closeAllPopups = () => {
        setChangeAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddImagePopupOpen(false)
        setSelectedCard(null)
    }

    
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
    return (
        <div className="page" >
            <currentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditProfile={handleEditClick}
                    onAddPlace={handleAddClick}
                    onEditAvatar={handleAvatarClick}
                    onCardClick={handleCardClick}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    isClose={closeAllPopups}
                    closeToOverlay={handleOverlayClose}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddImagePopupOpen}
                    isClose={closeAllPopups}
                    onSubmit={handleAddPlaceSubmit}
                    // onAddPlace={}
                    closeToOverlay={handleOverlayClose}
                />
                <EditAvatarPopup
                    isClose={closeAllPopups}
                    closeToOverlay={handleOverlayClose}
                    isOpen={isChangeAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupImage
                    card={selectedCard}
                    isClose={closeAllPopups}
                    closeToOverlay={handleOverlayClose}
                />
                <Footer />
            </currentUserContext.Provider>
        </div>
    );
}

export default App;
