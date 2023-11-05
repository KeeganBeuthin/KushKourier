import React from "react";
import Link from "next/link";
const BreadCrumb = () => {
    return (
        <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/home">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
      </div>
      </>
    );
  };
  export default BreadCrumb;