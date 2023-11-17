//@flow
import React from "react";
import Navbar from "../components/navbar";
import ProductCard from "../components/productCard";
import BreadCrumbShop from "../components/breadCrumbShop";
import ShopSidebar from "../components/shopSideBar";

type ShopProps = {};

const Shop = (): React$Element<any> => {
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
            <ProductCard />
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
        </>
  );
};

export type { ShopProps };
export default Shop;
