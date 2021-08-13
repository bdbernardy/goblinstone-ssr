import './navbar.scss';

import React from 'react';

import {Link} from 'react-router-dom';

import seperator from 'Images/header/navbar-seperator.png';

const Navbar = () => {
  return (
    <div className="link-container">
      <div>
        <Link to="/" title="Home">Home</Link>
        <img loading="eager" src={seperator} alt="" />
      </div>
      <div>
        <Link to="/blog">Blog</Link>
        <img src={seperator} alt="" />
      </div>
      <div>
        <Link to="/freebies">Freebies</Link>
        <img src={seperator} alt="" />
      </div>
      <div>
        <Link to="/products">Products</Link>
        <img src={seperator} alt="" />
      </div>
      <div>
        <Link to="/art-gallery">Gallery</Link>
        <img src={seperator} alt="" />
      </div>
      <div>
        <Link to="/fellowship">Fellowship</Link>
        <img src={seperator} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
