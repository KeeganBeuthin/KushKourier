import React, { useState, useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";

const isAndroid = Capacitor.getPlatform() === "android";

let client;

if (isAndroid) {
  client = "http://192.168.39.115:9000/api/products";
} else {
  client = "/api/products";
}

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [images, setImages] = useState([])
  const images = useRef([])
  const products = useRef([])
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

          const productInf = response.data.product;
          const imageInf = response.data.base64ImageData
     
          images.current=imageInf;
          products.current=productInf
          console.log(images)
          console.log(products.current)
          setLoading(false);
        }
      } catch {
        console.log("An errors occurred");
        setLoading(true);
      } 
    };
    fetchData();
  }, []);






  return (
    <div className="container">
      <div className="row">
      {loading ? (
          <p>Loading...</p>
        ) : (
       
            <div  className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`data:image/png;base64,${images.current}`}
                  className="card-img-top"
                  alt={products.current.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{products.current.product_name}</h5>
                  <p className="card-text">Category: {products.current.category}</p>
                  <p className="card-text">Price: {products.current.price}R</p>
                </div>
              </div>
            </div>
          
        )}
      </div>
    </div>
  );
};

export default ProductList;
