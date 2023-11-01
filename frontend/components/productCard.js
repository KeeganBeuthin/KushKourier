import React, { useState, useEffect } from "react";

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

  const [loading, setloading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  const handlePageChange = async (page) => {
    if (
      page < 1 ||
      page > Math.ceil(products.length / productsPerPage) ||
      loading
    ) {
      return;
    }

    try {
      setloading(true);
      console.log("trying");
      let productPage;

      if (isAndroid) {
        productPage = `http://192.168.39.115:9000/api/products/${page}`;
      } else {
        productPage = `/api/products/${page}`;
      }

      const options = {
        url: productPage,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        params: {
          page: page,
        },
      };
      console.log(page);
      const response = await CapacitorHttp.get(options);
      console.log(response);
      if (response.status === 200 || response.status === 304) {
        const productInfo = response.data.products;
        setProducts(productInfo);
        setCurrentPage(page);
        setloading(false);
      }
    } catch {
      console.log("An error occurred");
      setloading(false);
    }
  };

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

        if (response.status === 200 || response.status === 304) {
          const productInfo = response.data.products;
          setProducts(productInfo);
          setloading(false);
        }
      } catch {
        console.log("An error occurred");
        setloading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <p>retrieving products</p>
        ) : (
          products.map((product) => (
            <div key={product.product_id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`data:image/png;base64,${product.image[0]}`}
                  className="card-img-top"
                  alt={product.product_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Price: R{product.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <nav aria-label="Product Page Navigation">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <a className="page-link" role="button" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                  role="button"
                >
                  {index + 1}
                </a>
              </li>
            ),
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(products.length / productsPerPage)
                ? "disabled"
                : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <a className="page-link" role="button" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
