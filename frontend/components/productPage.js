import React, { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import ProductSideBar from "./productSideBar";
import ProductList from "./productCard";
const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const isAndroid = Capacitor.getPlatform() === "android";

  let client;

  if (isAndroid) {
    client = "http://192.168.39.115:9000/api/products";
  } else {
    client = "/api/products";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          url: client,
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        };
        const response = await CapacitorHttp.get(options);
        if (response.status === 200 || 304) {
          const responseData = await response.json();
          console.log(responseData);
          setProducts(responseData);
          console.log(products);
        }
      } catch {
        console.log("An error occurred");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ProductList />
    </>
  );
};
export default ProductPage;
