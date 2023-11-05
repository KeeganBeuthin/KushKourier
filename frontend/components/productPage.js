import React, { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import ProductSideBar from "./productSideBar";
import ProductList from "./productCard";
import ShopSideBar from './shopsidebar'

const ProductPage = () => {
  
  return (
    <>
      <ProductList/>   
    </>
  );
};
export default ProductPage;
