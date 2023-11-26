//@flow
import React from "react";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/productCard";
import BreadCrumbShop from "../../components/breadCrumbShop";
import ShopSidebar from "../../components/shopSideBar";

type ShopProps = {};

const Shop = (): React$Element<any> => {
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
            <BreadCrumbShop />
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export type { ShopProps };
export default Shop;
