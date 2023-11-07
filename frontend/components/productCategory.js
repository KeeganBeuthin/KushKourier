//@flow
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import Link from "next/link";
const isAndroid = Capacitor.getPlatform() === "android";

const ProductCategory = () => {
  const productsPerPage = 10;
  const router = useRouter();

  const { page } = router.query;
  const {category} = router.query
  const pageNum = parseInt(page, 10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (page !== undefined) {
      // Check if page is defined
      const fetchData = async () => {
        try {
            console.log(category)
          let productPage;

          if (isAndroid) {
            productPage = `http://192.168.39.115:9000/api/products/${category}/${page}`;
          } else {
            productPage = `/api/products/${category}/${page}`;
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

          let response = await CapacitorHttp.get(options);

          if (response.status === 200 || response.status === 304) {
            let productInfo = response.data.products;
            setProducts(productInfo);
            setLoading(false);
          } else if (response.status === 404 || response.status === 500) {
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

  console.log(products[0])

  return (
    <div className="container">
      {error ? (
        <div className='container'>
           <h1>Error 404: content unavailable</h1>
        <img className="card-img-top" src="/error404.jpg" alt="Title" />
        <nav
            aria-label="Page navigation example"
            className="d-flex justify-content-center"
          >
          <ul className="pagination">
            <li className="page-item">
              <Link legacyBehavior href={`/${category}/${page - 1}`} passHref>
                <a className={`page-link ${page === 1 ? "disabled" : ""}`}
                disabled={page === 1}
                onClick={() => {
                  if (page >= 0) {
                   window.location.href = `/${category}/${pageNum -1}`;
                  }
                }}>
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
                  <Link legacyBehavior href={`/${category}/${index + 1}`} passHref>
                    <a className="page-link">{index + 1}</a>
                  </Link>
                </li>
              ),
            )}
            <li className="page-item">
              <Link legacyBehavior href={`/${category}/${pageNum + 1}`} passHref>
                <a className={`page-link ${pageNum === pageNum + 1}`} 
                 
                 onClick={() => {
                   if (pageNum >= 0) {
                    window.location.href = `/${category}/${pageNum + 1}`;
                   }
                 }}
                 >
                    &raquo;
                 </a>
              </Link>
            </li>
          </ul>
          </nav>
       
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
                  <Link legacyBehavior href={`/products/${product.product_name}`} passHref>
                  <a>
                    <img
                      src={`data:image/png;base64,${product.image[0]}`}
                      className="card-img-top"
                      alt={product.product_name}
                    />
                     </a>
                  </Link>
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
              <Link legacyBehavior href={`/${category}/${page - 1}`} passHref>
                <a className={`page-link ${page == 1 ? "disabled" : ""}`}
                disabled={page === 1}
                onClick={() => {
                  if (page >= 0) {
                   window.location.href = `/${category}/${pageNum -1}`;
                  }
                }}>
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
                  <Link legacyBehavior href={`/${category}/${index + 1}`} passHref>
                    <a className="page-link">{index + 1}</a>
                  </Link>
                </li>
              ),
            )}
              <li className="page-item">
              <Link legacyBehavior href={`/${category}/${pageNum + 1}`} passHref>
                <a className={`page-link ${pageNum === pageNum + 1}`} 
                 
                 onClick={() => {
                   if (pageNum >= 0) {
                    window.location.href = `/${category}/${pageNum + 1}`;
                   }
                 }}
                 >
                    &raquo;
                 </a>
              </Link>
            </li>
          </ul>
          </nav>
        </div>
      )}
    </div>
  );
  };

export default ProductCategory;



