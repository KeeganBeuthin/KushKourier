// @flow
import React from "react";
import Navbar from "../../components/navbar";
import CartScreen from "../../components/cartScreen";
import CheckoutCard from "../../components/checkoutCard";

const Cart = () => {
  return (
    <>
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
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};

export default Cart;
