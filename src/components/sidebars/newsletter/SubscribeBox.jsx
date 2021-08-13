import './subscribe.scss';

import React from 'react';

const SubscribeBox = () => {
  return (
    <div className="box">
      <header className="box-header">
        Join our Newsletter
      </header>
      <div className="box-content">
        Subscribe to our newsletter to stay up-to-date with our latest news and releases.
        <form className="subscribe-form flex-container flex-direction-column align-items-start">
          <input placeholder="Enter your Email" type="email" required className="m-t-md"/>
          <button type="submit" className="m-t-md button">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeBox;
