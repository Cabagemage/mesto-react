import React from "react";
import "../App.css";
// Попап не используется. Разметка зарезервирована для дальнейшего рефакторинга
function PopupRemove() {
  return (
    <div className="popup popup_function_remove">
      <form novalidate className="popup__form popup__form_function_remove">
        <div className="popup__container popup__container_function_remove">
          <button
            type="button"
            className="popup__close popup_close_remove"
          ></button>
          <h2 className="popup__edit">Вы уверены?</h2>
          <button
            type="submit"
            className="popup__save  popup__save_function_remove"
          >
            Удалить
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupRemove;
