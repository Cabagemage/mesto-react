import React from "react";
import "../App.css";

function Login() {
  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form">
        <input className="login__email" placeholder="Введите email"></input>
        <input className="login__password" placeholder="Введите пароль"></input>
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
