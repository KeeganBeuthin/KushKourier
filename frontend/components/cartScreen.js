import React, { useEffect, useState } from 'react';
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";

const isAndroid = Capacitor.getPlatform() === "android";

let getCart;

let deleteItem;

if (isAndroid) {
  getCart = "http://192.168.39.116:9000/api/cart/get";
} else {
  getCart = "/api/cart/get";
}

if (isAndroid) {
  deleteItem = "http://192.168.39.116:9000/api/cart/removeItem";
} else {
  deleteItem = "/api/cart/removeItem";
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const getCookieValue = (cookieName) => {
          const cookiesArray = document.cookie.split('; ');
          for (const cookie of cookiesArray) {
            const [name, value] = cookie.split('=');
            if (name === cookieName) {
              return value;
            }
          }
          return null; 
        };
        
        
        const cartHashCookieValue = getCookieValue('cartHash');


        const options = {
          url: getCart,
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        };

        if (isAndroid) {

          options.headers.Cookie = `cartHash=${cartHashCookieValue}`;

          await new Promise(resolve => setTimeout(resolve, 1000));
          
        }

        let response = await CapacitorHttp.get(options);

        if (response.status === 200 || response.status === 304) {
          let cartData = response.data;
          setCartItems(cartData);
          setLoading(false);
        } else if (response.status === 404 || response.status === 500) {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        console.log("An error occurred");
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const removeItem = (item) => {

    try {
      const options = {
        url: deleteItem,
        headers: {
          "Content-Type": "application/json",
          'credentials': "include",
        },
        data:{item}
      };

      let response = CapacitorHttp.post(options);

      if (response.status === 200 || response.status === 304) {
        next()
      } else if (response.status === 404 || response.status === 500) {
        console.log('fuck')
        setError(true);
      }
    } catch (error) {
      console.log("An error occurred");
      setLoading(false);
      setError(true);
    }

    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  return (
    <div className="container">
      <h2 className="my-4 text-center text-success">Shopping Cart</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading cart items.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={`data:image/png;base64,${product.image_data}`}
                    alt={product.product_name}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                 
                  />
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => removeItem(JSON.stringify(product.cart_id))}
                  >
                     <img
                    src={'/remove.svg'}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                  </button>
                </td>
                <td>{product.product_name}</td>
                <td>{product.quantity}</td>
                <td>R {product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartScreen;
