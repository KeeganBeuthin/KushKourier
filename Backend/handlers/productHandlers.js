const cors = require("cors");
const postgres = require("postgres");
const OpenAPIBackend = require("openapi-backend").default;
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const bcrypt = require("bcrypt");
const { createClient } = require("redis");
const cookieParser = require("cookie-parser");
const app = express();
const sql = postgres("postgres://postgres:hahaha@127.0.0.1:8080/rat");
const path = require("path");
const fs = require("fs");


let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "SessionStore:",
});

module.exports ={

    updateProduct: async (c, req, res) => {
        const id = c.request.params.productId;
    
        console.log(id);
      },
      getProducts: async (c, req, res) => {
        const product = await sql`
          select * from products 
          `;
          console.log(product)
        return res.status(200).json({ product });
      },
      getProductById: async (c, req, res) => {
        const id = c.request.params.productId;
    
        const product = await sql`
            select * from products where product_id=${id}
            `;
        return res.status(200).json({ product });
      },
    
      createProduct: async (c, req, res) => {
        const files = [];
    
        const { productName, productPrice, productStock, productCategory } =
          req.body.values;
          
        const imageInfo = req.body.imageInfo;
    
        const saveBinaryDataToFile = (binaryData, fileExtension) => {
          return new Promise((resolve, reject) => {
            const timestamp = Date.now();
            const filename = `${timestamp}.${fileExtension}`;
            const filePath = path.join(__dirname, 'uploads', filename);
        
            fs.writeFile(filePath, binaryData, 'binary', async (err) => {
              if (err) {
                console.error('Error saving file:', err);
                reject(err);
              } else {
                console.log(`File saved: ${filename}`);
                files.push({ path: filePath, filename });
        
      
                try {
                  const product = await sql`
                    insert into products (product_name, price, stock, category, discount, image_url) 
                    values (${productName}, ${productPrice}, ${productStock}, ${productCategory},0,${filename})
                  `;
                  resolve(product);
                } catch (error) {
                  console.error('SQL insertion error:', error);
                  reject(error);
                }
              }
            });
          });
        };
    
    
    
        const fileName = imageInfo.filename;
    
        const base64Data = imageInfo.data;
    
        const binaryData = Buffer.from(base64Data, "base64");
    
        saveBinaryDataToFile(binaryData, fileName)
      .then(() => {
        console.log('File saved and product inserted successfully.');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
        return res.status(200).json({ success: "product created" });
      },
    
}
