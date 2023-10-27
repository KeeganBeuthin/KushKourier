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

module.exports = {
  //cart

  addToCart: async (c, req, res) => {
    const { user_id, product_id, quantity, price } = req.body;

    if (!user_id || !product_id || !quantity || !price) {
      return res.status(400).json({ error: "Invalid cart item data" });
    }

    try {
      await sql`
          INSERT INTO carts (user_id, product_id, quantity, price)
          VALUES (${user_id}, ${product_id}, ${quantity}, ${price})
        `;
      return res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  removeFromCart: async (c, req, res) => {
    const { user_id, cart_id } = req.body;

    if (!user_id || !cart_id) {
      return res.status(400).json({ error: "Invalid user or cart item data" });
    }

    try {
      await sql`
          DELETE FROM carts
          WHERE cart_id = ${cart_id} AND user_id = ${user_id}
        `;
      return res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  updateQuantity: async (c, req, res) => {
    const { user_id, cart_id, new_quantity } = req.body;

    if (!user_id || !cart_id || new_quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Invalid user, cart item, or quantity data" });
    }

    try {
      await sql`
          UPDATE carts
          SET quantity = ${new_quantity}
          WHERE cart_id = ${cart_id} AND user_id = ${user_id}
        `;
      return res.status(200).json({ message: "Cart item quantity updated" });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  getCartContents: async (c, req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const cartContents = await sql`
          SELECT cart_id, product_id, quantity, price
          FROM carts
          WHERE user_id = ${user_id}
        `;
      return res.status(200).json(cartContents);
    } catch (error) {
      console.error("Error retrieving cart contents:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  getCartPrice: async (c, req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const totalPrice = await sql`
          SELECT SUM(quantity * price) AS total_price
          FROM carts
          WHERE user_id = ${user_id}
        `;
      return res.status(200).json(totalPrice[0]);
    } catch (error) {
      console.error("Error calculating cart total price:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  //Validate

  cookieValidate: async (c, req, res) => {
    const session = req.session.id;

    const cookies = req.headers.cookie;

    const sessionData = await redisClient.get(`SessionStore:${session}`);
    if (!sessionData) {
      return res.status(500).json({ error: "session data not found" });
    }
    const id = JSON.parse(sessionData);

    const identifierNum = id.userId[0].user_id;

    const userInfo = await sql`
      select email,username from accounts where user_id =${identifierNum}
      `;

    const package = userInfo[0];
    console.log(package);
    return res.status(200).json({ package });
  },
  adminValidate: async (c, req, res) => {
    const session = req.session.id;

    const cookies = req.headers.cookie;

    const sessionData = await redisClient.get(`SessionStore:${session}`);
    if (!sessionData) {
      return res.status(500).json({ error: "session data not found" });
    }
    const id = JSON.parse(sessionData);

    const identifierNum = id.userId[0].user_id;

    const userInfo = await sql`
      select role from accounts where user_id =${identifierNum}
      `;
     
   const roleInfo = userInfo[0].role


   const stringRole = JSON.stringify(roleInfo)


const parsedRole = JSON.parse(stringRole)


   if(parsedRole==="master"){
    res.status(201).json({validated: 'welcome master user'})
   }else if(parsedRole==="admin"){
    return res.status(200).json({validated:'welcome admin' });
   } else {
    return res.status(400).json({error:'validation failed'})
  }
  },

  //products

  updateProduct: async (c, req, res) => {
    const id = c.request.params.productId;

    console.log(id);
  },
  getProducts: async (c, req, res) => {
    const product = await sql`
      select * from products 
      `;
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
console.log(req.body.values)
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
    
            // Assume you have obtained the values (productName, productPrice, productStock, productCategory) from somewhere before this function call.
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

  //user manipulation

  loginUser: async (c, req, res) => {
    const { loginUsername, loginPassword } = req.body;

    const userCheck = await sql`
          select * from accounts where username=${loginUsername}
          `;

    const emailvalue = await sql`
    select email from accounts where username=${loginUsername} 
    `;

    const email = emailvalue[0].email;

    if (!userCheck) {
      return res.status(400).json({ error: "invalid user information" });
    }

    const hash = await sql`
    select password from accounts where email=${email}
    `;

    if (!hash) {
      return res.status(400).json({ error: "password select failed" });
    }

    const passwordCheck = await bcrypt.compare(loginPassword, hash[0].password);

    const id = await sql`
          select user_id from accounts where email=${email}
          `;
    console.log(id);

    const sessionId = req.session.id;

    req.session.userId = id;

    console.log(req.session.userId);
    req.session.save(function (err) {
      if (err) return err;

      console.log("session saved");
      return res.status(200).json({ sessionId });
    });
  },

  registerUser: async (c, req, res) => {
    const {
      registerUsername,
      registerEmail,
      registerPassword,
      registerCpassword,
      registerFirstName,
      registerLastName,
    } = req.body;

    if (
      !registerUsername ||
      !registerCpassword ||
      !registerEmail ||
      !registerPassword ||
      !registerFirstName ||
      !registerLastName
    ) {
      return res.status(400).json({ error: "incorrect info" });
    }

    const usercheck = await sql`
          SELECT * FROM accounts WHERE username =${registerUsername}`;

    const emailCheck = await sql`
          SELECT * FROM accounts WHERE email =${registerEmail}`;

    if (registerPassword !== registerCpassword) {
      console.log("password match failed");
      return res.status(400).json({ error: "password match failed" });
    }

    if (emailCheck.length === 1) {
      console.log("email already exists");
      return res.status(400).json({ error: "email already exists" });
    }

    const hashPassword = await bcrypt.hash(registerPassword, 13);

    const result = await sql`
          INSERT INTO accounts (username,email,password,created_on,first_name,last_name,isvalidated,role) VALUES (${registerUsername},${registerEmail},${hashPassword},now(),${registerFirstName},${registerLastName},false,'user')
        `;

    console.log(
      `new user created with username ${registerUsername} and email ${registerEmail}`
    );

    const id = await sql`
          select user_id from accounts where email=${registerEmail}
          `;

    const sessionId = req.session.id;

    req.session.userId = id;

    console.log(req.session.userId);
    req.session.save(function (err) {
      if (err) return err;

      console.log("session saved");
      return res.status(200).json({ sessionId });
    });
  },

  logoutUser: async (c,req,res) => {
    const sessionId = req.session.id
    console.log(sessionId)
    if(!sessionId){
      return res.status(400).json({error:'no session'})
    }

   req.session.destroy((err, reply) =>{
      if(err){
        console.error(err);
        return res.status(500).json({error:'failed to delete session data'})
      }
      return res.status(200).json({successs:'session deleted'})
  })
},

  // registerMasterUser: async (c, req, res) => {
  //   const { registerUsername, registerEmail, registerPassword, registerCpassword, registerFirstName, registerLastName } = req.body;

  //   if (!registerUsername || !registerCpassword || !registerEmail || !registerPassword || !registerFirstName || !registerLastName) {
  //     return res.status(400).json({ error: 'incorrect info' })
  //   }

  //   const usercheck = await sql`
  //   SELECT * FROM accounts WHERE username =${registerUsername}`

  //   const emailCheck = await sql`
  //   SELECT * FROM accounts WHERE email =${registerEmail}`

  //   if (registerPassword !== registerCpassword) {
  //     console.log('password match failed')
  //     return res.status(400).json({ error: 'password match failed' })
  //   }

  //   if (emailCheck.length === 1) {
  //     console.log('email already exists')
  //     return res.status(400).json({ error: 'email already exists' })
  //   }

  //   const hashPassword = await bcrypt.hash(registerPassword, 13)

  //   const result = await sql`
  //   INSERT INTO accounts (username,email,password,created_on,first_name,last_name,role,isvalidated) VALUES (${registerUsername},${registerEmail},${hashPassword},now(),${registerFirstName},${registerLastName},'master',true)
  // `

  //   console.log(`new user created with username ${registerUsername} and email ${registerEmail}`)

  //   const id = await sql`
  //   select user_id from accounts where email=${registerEmail}
  //   `

  //   const sessionId = req.session.id

  //   req.session.userId= id

  //        console.log(req.session.userId)
  //         req.session.save(function (err) {
  //           if (err) return (err)

  //           console.log('session saved')
  //           return res.status(200).json({sessionId})
  //         })

  // },

  updateUserName: async (c, req, res) => {
    const session = req.session.id;
    const newUsername = req.body.profileUsername;
    const usernameString = newUsername;
    console.log(usernameString);

    if (!session) {
      return res.status(400).json({ error: "session not found" });
    }

    const sessionData = await redisClient.get(`SessionStore:${session}`);
    if (!sessionData) {
      return res.status(500).json({ error: "session data not found" });
    }

    const id = JSON.parse(sessionData);

    const identifierNum = id.userId[0].user_id;

    const userInfo = await sql`
        update accounts set username=${usernameString} where user_id=${identifierNum}
          `;
    return res.status(200).json({ success: "username changed" });
  },

  updateEmail: async (c, req, res) => {
    const session = req.session.id;
    const newEmail = req.body.profileEmail;
    console.log(req.body);
    const emailString = newEmail;
    console.log(emailString);

    if (!session) {
      return res.status(400).json({ error: "session not found" });
    }

    const sessionData = await redisClient.get(`SessionStore:${session}`);
    if (!sessionData) {
      return res.status(500).json({ error: "session data not found" });
    }

    const id = JSON.parse(sessionData);

    const identifierNum = id.userId[0].user_id;

    const userInfo = await sql`
        update accounts set email=${emailString} where user_id=${identifierNum}
          `;
    return res.status(200).json({ success: "username changed" });
  },
  updateLegalName: async (c, req, res) => {
    const session = req.session.id;
    const newName = req.body.profileLegalName;
    console.log(req.body);
    const nameString = newName;

    if (!session) {
      return res.status(400).json({ error: "session not found" });
    }

    const sessionData = await redisClient.get(`SessionStore:${session}`);
    if (!sessionData) {
      return res.status(500).json({ error: "session data not found" });
    }

    const id = JSON.parse(sessionData);

    const identifierNum = id.userId[0].user_id;

    const userInfo = await sql`
        update accounts set legal_name=${nameString} where user_id=${identifierNum}
          `;
    return res.status(200).json({ success: "username changed" });
  },

  validationFail: async (c, req, res) =>
    res.status(400).json({ err: c.validation.errors }),
  notFound: async (c, req, res) => res.status(404).json({ err: "not found" }),
};
