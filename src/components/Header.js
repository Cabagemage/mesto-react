import React from "react";
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';
import "../App.css";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <Link className="header__login" to="/sign-in">Войти</Link>
    </header>
  );
}

export default Header;
