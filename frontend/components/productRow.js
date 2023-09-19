const ProductRow = () => {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src="holder.js/100x180/" alt="Title" />
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Text</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src="holder.js/100x180/" alt="Title" />
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Text</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src="holder.js/100x180/" alt="Title" />
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductRow;
  