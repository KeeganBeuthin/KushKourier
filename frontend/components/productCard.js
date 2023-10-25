import React from 'react';

const ProductItem = ({ product }) => {
  const { name, price, category, image } = product;

  return (
    <div className="product-item">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price}</p>
      <p className="product-category">Category: {category}</p>
    </div>
  );
};

export default ProductItem;
