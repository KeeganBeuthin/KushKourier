//@flow
import React from "react";
import Navbar from "../components/navbar";
import ProductPage from "../components/productPage";
import BreadCrumbShop from "../components/breadCrumbShop";
import ShopSidebar from "../components/shopSideBar";

const test = (): React$Element<any> => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <ShopSidebar />
          </div>
          <div className="col-md-9">
            <BreadCrumbShop />
            <ProductPage />
          </div>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};

export default test;
