// components/ProductDisplay.js

import React from "react";
import ProductPage from "../../components/productPage";
import Navbar from "../../components/navbar";
import BreadCrumbProduct from "../../components/breadCrumbProduct";
import ShopSidebar from "../../components/shopSideBar";

const Product = () => {
  return (
    <>
      <script src="/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <ShopSidebar />
          </div>
          <div className="col-md-9">
            <BreadCrumbProduct />
            <ProductPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
