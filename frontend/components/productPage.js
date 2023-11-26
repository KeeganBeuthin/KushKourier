//@flow
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { setProductName } from '../redux/productSlice';
import { useDispatch, useSelector } from "react-redux";

const isAndroid = Capacitor.getPlatform() === "android";



const ProductPage = () => {

  const dispatch = useDispatch();

  const router = useRouter();

  const {product} = router.query;
  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (product !== undefined) {

      // Check if page is defined
      const fetchData = async () => {

        const encodedProductName = encodeURIComponent(product);

        try {
          let productURL;
          if (isAndroid) {
            productURL = `http://192.168.39.116:9000/api/product/${encodedProductName}?product=${encodedProductName}`;
          } else {
            productURL = `/api/product/${encodedProductName}?product=${encodedProductName}`;
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

          let response = await CapacitorHttp.get(options);

          if (response.status === 200 || response.status === 304) {
            let productData = response.data.product[0];
            setProductInfo(productData);
            dispatch(setProductName(productData.product_name));
           
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
  }, [product, dispatch]);

  const productName = useSelector((state) => state.product);

console.log(productName)
  const addToCart = async () => {
    
  try{
    let cartUrl;
    if (isAndroid) {
      cartUrl = `http://192.168.39.116:9000/api/cart/add`;
    } else {
      cartUrl = `/api/cart/add`;
    }

    const itemData: object = {
      category: productInfo.category,
      price: productInfo.price,
      quantity: quantity,
      product_id: productInfo.product_id,
      product_name: productInfo.product_name,
    }

    const cartInfo = {itemData}

    const getCookieValue = (cookieName) => {
      const cookiesArray = document.cookie.split('; ');
      for (const cookie of cookiesArray) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
          return value;
        }
      }
      return null; 
    };
    
    
    const cartHashCookieValue = getCookieValue('cartHash');

  
  const options = {
    url: cartUrl,
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      authorization: "include",
    },
    data: cartInfo,
  };

  if (isAndroid) {

    options.headers.Cookie = `cartHash=${cartHashCookieValue}`;

    await new Promise(resolve => setTimeout(resolve, 1000));
  }


  let response = await CapacitorHttp.post(options);
  if(response.status==200){
    setItemAdded(true)
    console.log('good')
  }
  }
  catch (error) {
    console.error(error, "Cart addition error");
  }
};

  const totalPrice = productInfo.price * quantity;

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
                      
                      <div className="mt-2">
                        <Button
                          variant="outline-primary"
                          onClick={decrementQuantity}
                        >
                          -
                        </Button>
                        <span className="mx-2">{quantity}</span>
                        <Button
                          variant="outline-primary"
                          onClick={incrementQuantity}
                        >
                          +
                        </Button>
                        
                      </div>
                      <div className="mt-2">
                        Total Price: R{totalPrice}
                      </div>
                      <Button variant="primary" onClick={addToCart} className='mt-3'>Add to Cart</Button>
                      {itemAdded && (
                      <div className="text-success mt-3">Item successfully Added X3!</div>
                     )}
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
