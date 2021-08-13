import './header.scss';

import React from 'react';
import {Link} from "react-router-dom";

import goblinStoneLogo from 'Images/header/goblin-stone-logo.png';

import BurgerMenuIcon from 'Images/header/menu-icon.svg';
import SearchIcon from 'Images/header/search-icon.svg';
import ShoppingCart from 'Images/header/cart-icon.svg';
import AccountIcon from 'Images/header/account-icon.svg';

const Header = () => {
  const handleBurgerMenuClick = () => {
    const bodyTag = document.getElementsByTagName('body')[0];

    if (bodyTag.classList.contains('menu-toggled')) {
      bodyTag.classList.remove('menu-toggled');
    } else {
      window.scrollTo(0, 0);
      bodyTag.classList.add('menu-toggled');
    }
  };

  return (
    <>
      <div className="logo-container">
        <Link to="/">
          <img src={goblinStoneLogo} alt="" />
        </Link>
      </div>

      <div className="header-menu">
        <div className="flex-container">
          <button type="button" className="flex-container align-items-center" onClick={handleBurgerMenuClick}>
            <BurgerMenuIcon />
            <span>Menus</span>
          </button>
          <button type="button" className="flex-container align-items-center">
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>

        <div className="flex-container">
          <button type="button" className="flex-container align-items-center">
            <AccountIcon />
            <span>Connexion</span>
          </button>
          <Link className="flex-container align-items-center" to="/Shopping/ShoppingCart">
            <ShoppingCart />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
