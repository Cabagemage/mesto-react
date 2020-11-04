import React, { useState, useEffect} from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import PopupImage from "./PopupImage";
import { apiProfile } from "../utils/Api.js";
import { currentUserContext } from "../contexts/currentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from "./HOC/ProtectedRoute"

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddImagePopupOpen, setAddImagePopupOpen] = useState(false);
  const [isChangeAvatarPopupOpen, setChangeAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    apiProfile
      .getAppinfo()
      .then((res) => {
        const [initCards, info] = res;
        setCurrentUser(info);
        setCards(initCards);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  const handleUpdateUser = (user) => {
    apiProfile
      .setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (url) => {
    apiProfile
      .changeProfileAvatar(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  // const handleEscClose = () => {
  //   document.addEventListener('keyup', (e) => {
  //     if (e.key === 'escape') closeAllPopups();
  //    });
  //  }

  const handleAddPlaceSubmit = (name, link) => {
    apiProfile
      .postNewCard(name, link)
      .then((data) => {
        setCards([...cards, data]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  const handleEditClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddClick = () => {
    setAddImagePopupOpen(true);
  };
  const handleAvatarClick = () => {
    setChangeAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setChangeAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddImagePopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    apiProfile
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    apiProfile
      .deleteThisCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) =>  c._id !== card._id)
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  return (
    <BrowserRouter>

       <Switch>
    <div className="page">
      <currentUserContext.Provider value={currentUser}>

        <Header />
        <Route exact path="/">
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditClick}
          onAddPlace={handleAddClick}
          onEditAvatar={handleAvatarClick}
          onCardClick={handleCardClick}
        />
        </Route>
          <Route exact path="/sign-in">
          <Login />
        </Route>
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
      </Switch>

    </BrowserRouter>
  );
}

export default App;
