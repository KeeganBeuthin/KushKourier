import React, { useEffect, useState } from 'react';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Make an API call to retrieve cart items from '/api/cart/get'
    fetch('/api/cart/get')
      .then((response) => response.json())
      .then((data) => setCartItems(data));
  }, []);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((product) => (
          <li key={product.id}>
            <div className="product-info">
              <img src={product.image} alt={product.product_name} />
              <div>
                <p>{product.product_name}</p>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <p>Total Price: ${product.totalPrice}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartScreen;