import './footer.scss';

import React from 'react';

import {Link} from "react-router-dom";

const PageFooter = () => {
  return (
    <div className = "footer-container">
      <div className="flex-container">
        <Link to="/about">About</Link>
        <span> | </span>
        <Link to="/contact">Contact</Link>
        <span> | </span>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      <div>
        © 2020 Benoit de Bernardy, All Rights Reserved.
      </div>
    </div>
  );
};

export default PageFooter;
