import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  isClose,
  closeToOverlay,
  onUpdateAvatar,
}) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      form="avatar"
      title="Обновить аватар"
      popupCloseName="avatar"
      isOpen={isOpen}
      isClose={isClose}
      closeToOverlay={closeToOverlay}
      children={
        <>
          <div className="popup__inputs">
            <input
              type="url"
              ref={avatarRef}
              name="Аватар"
              required
              className="popup__input popup__input_type_link"
              placeholder="Ссылка"
            />
            <span id="avatar-error" className="popup__input_type_error"></span>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="popup__save   popup__save_function_create"
          >
            Обновить
          </button>
        </>
      }
    />
  );
}
