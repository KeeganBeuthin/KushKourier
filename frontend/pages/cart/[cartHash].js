// @flow
import React from "react";
import Navbar from "../../components/navbar";
import CartScreen from "../../components/cartScreen";
import CheckoutCard from "../../components/checkoutCard";

const Cart = () => {
  return (
    <>
      <script src="/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <Navbar />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8">
            <CartScreen />
          </div>
          <div className="col-md-4">
            <CheckoutCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
