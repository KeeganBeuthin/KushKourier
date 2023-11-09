CREATE TABLE accounts (
    user_id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_on TIMESTAMPTZ DEFAULT current_timestamp,
    isvalidated BOOLEAN,
    mobile INT
);

CREATE TABLE categories (
    category_id serial PRIMARY KEY,
    category_name TEXT NOT NULL
);


CREATE TABLE products (
    product_id serial PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    discount INT,
    category_id INT 
);

ALTER TABLE products
ADD CONSTRAINT fk_category_id
    FOREIGN KEY (category_id)
    REFERENCES categories(category_id);

CREATE TABLE images (
    image_id serial PRIMARY KEY,
    image_data BYTEA,
    product_id INT
);

ALTER TABLE images
ADD CONSTRAINT fk_product_id
    FOREIGN KEY (product_id)
    REFERENCES Products(product_id);
    
CREATE TABLE Carts (
    cart_id SERIAL PRIMARY KEY,
    cart_hash VARCHAR NOT NULL,
    user_id INT,
    product_id INT,
    quantity INT,
    price INT
);

ALTER TABLE Carts
ADD CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES accounts(user_id);