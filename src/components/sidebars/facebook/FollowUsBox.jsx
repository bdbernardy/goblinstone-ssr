import React from 'react';

import likeUsOnFacebook from 'Images/components/like-us-facebook.png';

const FollowUsBox = () => {
  return (
    <div className="box">
      <header className="box-header">
        Follow Us
      </header>
      <div className="box-content flex-container flex-direction-column">
        <div>Follow us on Facebook to stay up-to-date with our latest products and to share your opinion with us!</div>
        <a title="Follow Us on Facebook"
          href="https://www.facebook.com/GoblinStoneRPG/"
          className="m-t-md"
          target="_blank"
          rel="noopener noreferrer">

          <img className="width-100" src={likeUsOnFacebook} />
        </a>
      </div>
    </div>
  );
};

export default FollowUsBox;
