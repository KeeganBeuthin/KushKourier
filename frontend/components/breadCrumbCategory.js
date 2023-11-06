import React from "react";
import Link from "next/link";
const BreadCrumbCategory = () => {
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
              Sub-Category
            </li>
          </ol>
        </nav>
      </div>
      </>
    );
  };
  export default BreadCrumbCategory;