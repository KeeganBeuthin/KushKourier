const productVal = (values:Values): Errors => {


    type Values = {
        ProductName: string | void,
        ProductCategory: string | void,
        ProductStock: string | void,
        ProductPrice: string | void
      };
      
      type Errors = {
        ProductName?: string | void,
        ProductCategory?: string | void,
        ProductStock?: string | void,
        ProductPrice?: string | void
      };

      
    const errors = {};

    if (!values.productName) {
      errors.productName = 'Product Name is required';
    }

    if (!values.productCategory) {
      errors.productCategory = 'Product Category is required';
    }


    if (isNaN(values.productStock)) {
      errors.productStock = 'Product Stock must be a number';
    } else if(!values.productStock){
        errors.productStock = 'Product Stock is required'
    } else if (values.productStock < 0){
        errors.productStock = 'Product Stock must be 0 or more'
    }


    if (isNaN(values.productPrice)) {
      errors.productPrice = 'Product Price must be a number';
    }else if(!values.productPrice){
        errors.productPrice = 'Product Price is required'
    } else if (values.productPrice < 0){
        errors.productPrice = 'Product Price must be 0 or more'
    }
  
    return errors;
  };

  export default productVal

