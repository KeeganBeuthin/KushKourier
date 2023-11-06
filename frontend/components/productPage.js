import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { setProductData } from '../redux/productSlice';
import { useDispatch, useSelector } from "react-redux";

const isAndroid = Capacitor.getPlatform() === "android";

const ProductPage = () => {

  const dispatch = useDispatch();

  const router = useRouter();

  const {product} = router.query;
  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (product !== undefined) {
      // Check if page is defined
      const fetchData = async () => {
        try {
          let productURL;
          if (isAndroid) {
            productURL = `http://192.168.39.115:9000/api/product/${product}`;
          } else {
            productURL = `/api/product/${product}`;
          }

          const options = {
            url: productURL,
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
            params: {
              product,
            },
          };

          const response = await CapacitorHttp.get(options);

          if (response.status === 200 || response.status === 304) {
            const productData = response.data.product[0];
            setProductInfo(productData);
            dispatch(setProductName(productData.product_name));
           
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
  }, [product, dispatch]);

  const productName = useSelector((state) => state.product);
  console.log(productName)

  return (
    <div className="container">
      {error ? (
        <div className="container">
          <h1>Error 404: content unavailable</h1>
          <img className="card-img-top" src="/error404.jpg" alt="Title" />
        </div>
      ) : (
        <>
          {loading ? (
            <p>Retrieving product details...</p>
          ) : (
            <Container className="mt-4">
              <Row>
                <Col md={6}>
                  <img
                    src={`data:image/png;base64,${productInfo.image[0]}`}
                    alt={productInfo.name}
                    className="img-fluid"
                  />
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{productInfo.product_name}</Card.Title>
                      <Card.Text>{productInfo.description}</Card.Text>
                      <Card.Text>
                        Price: R{productInfo.price}
                      </Card.Text>
                      <Card.Text>Category: {productInfo.category}</Card.Text>
                      <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </div>
  );
}; 
export default ProductPage;
