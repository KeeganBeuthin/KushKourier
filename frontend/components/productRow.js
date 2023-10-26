import React from "react";
const ProductRow = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="/fireball.png" alt="Title" />
            <div className="card-body">
              <h4 className="card-title">Popular Products!</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="/weedman.png" alt="Title" />
            <div className="card-body">
              <h4 className="card-title">Crazy Specials!</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="/cactus.png" alt="Title" />
            <div className="card-body">
              <h4 className="card-title">Growing Equipment!</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
