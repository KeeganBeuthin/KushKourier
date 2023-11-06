//@flow
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import Link from "next/link";
const isAndroid = Capacitor.getPlatform() === "android";

const ProductCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const router = useRouter();

  const { page } = router.query;
  const pageNum = parseInt(page, 10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (page !== undefined) {
      // Check if page is defined
      const fetchData = async () => {
        try {
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
              page,
            },
          };

          const response = await CapacitorHttp.get(options);

          if (response.status === 200 || response.status === 304) {
            const productInfo = response.data.products;
            setProducts(productInfo);
            setLoading(false);
          } else if (response.status === 404 || 500) {
            setLoading(false);
            setError(true)
          }
        } catch {
          console.log("An error occurred");
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [page]);

  return (
    <div className="container">
      {error ? (
        <div className='container'>
           <h1>Error 404: content unavailable</h1>
        <img className="card-img-top" src="/error404.jpg" alt="Title" />
       
        </div>
      ) : (
        <div>
          <div className="row">
            {loading ? (
              <p>Retrieving products</p>
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
          <nav
            aria-label="Page navigation example"
            className="d-flex justify-content-center"
          >
          <ul className="pagination">
            <li className="page-item">
              <Link legacyBehavior href={`/shop/${page - 1}`} passHref>
                <a className={`page-link ${page === 1 ? "disabled" : ""}`}>
                  &laquo;
                </a>
              </Link>
            </li>
            {Array.from(
              { length: Math.ceil(products.length / productsPerPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <Link legacyBehavior href={`/shop/${index + 1}`} passHref>
                    <a className="page-link">{index + 1}</a>
                  </Link>
                </li>
              ),
            )}
            <li className="page-item">
              <Link legacyBehavior href={`/shop/${pageNum + 1}`} passHref>
                <a className={`page-link ${page === page + 1}`}>&raquo;</a>
              </Link>
            </li>
          </ul>
          </nav>
        </div>
      )}
    </div>
  );
  };

export default ProductCard;



