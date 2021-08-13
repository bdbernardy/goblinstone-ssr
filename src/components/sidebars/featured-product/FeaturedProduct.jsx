import './featured-product.scss';

import React from 'react';

import sampleAdd from 'Images/temp/sample-ad.jpg';

const FeaturedProduct = () => {
  return (
    <div className="featured-product">
      <a>
        <img className="width-100 border-radius" src={sampleAdd} alt="" />
      </a>
    </div>
  );
};

export default FeaturedProduct;
