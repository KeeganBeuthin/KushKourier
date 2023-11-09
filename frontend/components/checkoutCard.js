import React, { useState, useEffect } from "react";
import { CapacitorHttp } from "@capacitor/core";
import { Capacitor } from "@capacitor/core";
import { useRouter } from "next/router";

const isAndroid = Capacitor.getPlatform() === "android";

let cartCheck;

if (isAndroid) {
  cartCheck = "http://192.168.39.115:9000/api/cart/value";
} else {
  cartCheck = "/api/cart/value";
}

const CheckoutCard = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { cartHash } = router.query;

  const handleCheckout = () => {};

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

          const response = await CapacitorHttp.get(options);

          if (response.status == 200) {
            console.log(response.data.total_price);
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

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Checkout</h5>
        {loading ? (
          <p className="card-text">Loading total price...</p>
        ) : totalPrice !== null ? (
          <p className="card-text">Total Price: R {totalPrice}</p>
        ) : (
          <p className="card-text">Failed to fetch total price</p>
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
