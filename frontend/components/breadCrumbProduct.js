import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
const BreadCrumbProduct = () => {

    const productName = useSelector((state) => state.product.productName);
    console.log(productName)
    return (
        <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/home">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/shop/1">Shop</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            {productName}
            </li>
          </ol>
        </nav>
      </div>
      </>
    );
  };
  export default BreadCrumbProduct;