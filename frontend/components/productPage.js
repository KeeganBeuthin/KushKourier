import React from 'react';
const ProductPage= () => {


return (
<div class="container mt-4">
    <h1>Products</h1>
   
    <div class="form-group">
        <label for="category">Filter by Category:</label>
        <select class="form-control" id="category">
            <option value="all">All Categories</option>
            <option value="marijuana">Marijuana</option>
            <option value="equipment">Growing Equipment</option>
            <option value="paraphernalia">Paraphernalia</option>
            <option value="seeds">Seeds</option>
        </select>
    </div>


    <div class="row" id="product-container">
   
    </div>


    <nav>
        <ul class="pagination" id="pagination-container">
         
        </ul>
    </nav>
</div>

)
}
export default ProductPage