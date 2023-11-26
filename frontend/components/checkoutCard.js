import React, { useState, useEffect } from "react";
import { CapacitorHttp } from "@capacitor/core";
import { Capacitor } from "@capacitor/core";
import { useRouter } from "next/router";

const isAndroid = Capacitor.getPlatform() === "android";

let cartCheck;

let checkoutUrl;

let getCart;

if (isAndroid) {
  cartCheck = "http://192.168.39.116:9000/api/cart/value";
} else {
  cartCheck = "/api/cart/value";
}

if (isAndroid) {
  getCart = "http://192.168.39.116:9000/api/cart/get";
} else {
  getCart = "/api/cart/get";
}

if (isAndroid) {
  checkoutUrl = "http://192.168.39.116:9000/api/cart/createCheckout";
} else {
  checkoutUrl = "/api/cart/createCheckout";
}


const CheckoutCard = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  const { cartHash } = router.query;

  useEffect(() => {
    const fetchData = async () => {

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


      try {
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

          const formattedCartItems = cartData.map((item) => ({
            cart_id: item.cart_id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          }));

          setCartItems(formattedCartItems);
          setLoading(false);
        } else if (response.status === 404 || response.status === 500) {
          setLoading(false);
        }
      } catch (error) {
        console.log("An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckout = async () => {
    try {
      const options = {
        url: checkoutUrl,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        params: {
          cartHash,
        },
        data: cartItems,
      };

      const response = await CapacitorHttp.post(options);

      if (response.status == 200) {
        const redirect = response.data.redirect;

        window.location.href = redirect;
      } else {
        console.error("Failed to Checkout");
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while checking out", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartHash !== undefined) {
      const fetchTotalPrice = async () => {

        try {
          const options = {
            url: cartCheck,
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
            params: {
              cartHash,
            },
          };

console.log(cartHash)

          const response = await CapacitorHttp.get(options);

          if (response.status == 200) {
            setTotalPrice(response.data.total_price);
            setLoading(false);
          } else {
            console.error("Failed to fetch total price");
            setLoading(false);
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching the total price",
            error,
          );
          setLoading(false);
        }
      };
      fetchTotalPrice();
    }
  }, [cartHash]);

  console.log(cartItems);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Checkout</h5>
        {loading ? (
          <p className="card-text">Loading total price...</p>
        ) : totalPrice !== null ? (
          <p className="card-text">Total Price: R {totalPrice}</p>
        ) : (
          <p className="card-text">No total price available</p>
        )}
        <button className="btn btn-success" onClick={handleCheckout}>
          Checkout
          <img
            src={"/arrow.svg"}
            width="20"
            height={20}
            alt="arrow Icon"
            className="ms-3"
          />
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
