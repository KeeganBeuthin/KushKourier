import React, { useState, useEffect } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.log(response.data.product);
          const productInf = response.data.product;
          setProducts(productInf);
          console.log("products", products);
          setLoading(false);
        }
      } catch {
        console.log("An error occurred");
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image_url}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
