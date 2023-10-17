const cors = require('cors');
const postgres = require('postgres')
const OpenAPIBackend = require('openapi-backend').default;
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default
const bcrypt = require('bcrypt');
const { createClient } = require('redis');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.set('trust proxy', 1)
app.use(
  cors({
    origin: ["http://localhost:3000", 'http://10.0.2.16', "http://10.0.2.2:5554", "http://10.0.2.2:5555", "http://localhost", "http://192.168.39.115:9000", "http://localhost/"],
    methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type, Authorization, credentials']
  })
);
const sql = postgres('postgres://postgres:hahaha@127.0.0.1:8080/rat')

let redisClient = createClient()
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "SessionStore:",
})

app.use(session({
  name: 'info',
  secret: 'sexxx',
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 360000000, path: '/', sameSite: 'lax', httpOnly: true, secure: false },
}));

app.use(cookieParser())

const api = new OpenAPIBackend({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'kushKourier',
      version: '1.0.0',
    },
    paths: {
      '/api/login': {
        post: {
          operationId: 'loginUser', // Define the operationId
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  // Define the request body schema for the login endpoint
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Login successful',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },
      '/api/register': {
        post: {
          operationId: 'registerUser', // Define the operationId
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  // Define the request body schema for the register endpoint
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    cpassword: { type: 'string' }
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Registration successful',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },
    },
  },
  handlers: {
    // Define your handler functions for login and registration here
    loginUser: async (c, req, res) => {

      console.log(req.session)
      const { loginUsername, loginPassword } = req.body;

      const userCheck = await sql`
      select * from accounts where username=${loginUsername}
      `

      if (!userCheck) {
        return res.status(400).json({ error: 'invalid user information' })
      }


      const hash = await sql`
select password from accounts where username=${loginUsername}
`
      if (!hash) {
        return res.status(400).json({ error: 'password select failed' })
      }

      const passwordCheck = await bcrypt.compare(loginPassword, hash[0].password)


const sessionId = req.session.id
console.log(sessionId
  )


     
      req.session.save(function (err) {
        if (err) return (err)
        
        console.log('session saved')
        return res.status(200).json({sessionId})
      })   
      
      
    },


    registerUser: async (c, req, res) => {
      console.log(req.body)


      const { registerUsername, registerEmail, registerPassword, registerCpassword } = req.body;


      if (!registerUsername || !registerCpassword || !registerEmail || !registerPassword) {
        return res.status(400).json({ error: 'incorrect info' })
      }

      const usercheck = await sql`
      SELECT * FROM accounts WHERE username =${registerUsername}`

      const emailCheck = await sql`
      SELECT * FROM accounts WHERE email =${registerEmail}`

      if (registerPassword !== registerCpassword) {
        console.log('password match failed')
        return res.status(400).json({ error: 'password match failed' })
      }


      if (emailCheck.length === 1) {
        console.log('email already exists')
        return res.status(400).json({ error: 'email already exists' })
      }

      const hashPassword = await bcrypt.hash(registerPassword, 13)
      console.log('hash completed')

      const result = await sql`
      INSERT INTO accounts (username,email,password,created_on) VALUES (${registerUsername},${registerEmail},${hashPassword},now())
    `

      console.log(`new user created with username ${registerUsername} and email ${registerEmail}`)


      return res.status(200).json({ registerUsername, registerEmail })
    },addToCart: async (c, req, res) => {
      const { user_id, product_id, quantity, price } = req.body;
    
      if (!user_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: 'Invalid cart item data' });
      }
    
      try {
        await sql`
          INSERT INTO carts (user_id, product_id, quantity, price)
          VALUES (${user_id}, ${product_id}, ${quantity}, ${price})
        `;
        return res.status(200).json({ message: 'Product added to cart' });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'Server error' });
      }
    },
    
    removeFromCart: async (c, req, res) => {
      const { user_id, cart_id } = req.body;
    
      if (!user_id || !cart_id) {
        return res.status(400).json({ error: 'Invalid user or cart item data' });
      }
    
      try {
        await sql`
          DELETE FROM carts
          WHERE cart_id = ${cart_id} AND user_id = ${user_id}
        `;
        return res.status(200).json({ message: 'Product removed from cart' });
      } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ error: 'Server error' });
      }
    },
    
    updateQuantity: async (c, req, res) => {
      const { user_id, cart_id, new_quantity } = req.body;
    
      if (!user_id || !cart_id || new_quantity === undefined) {
        return res.status(400).json({ error: 'Invalid user, cart item, or quantity data' });
      }
    
      try {
        await sql`
          UPDATE carts
          SET quantity = ${new_quantity}
          WHERE cart_id = ${cart_id} AND user_id = ${user_id}
        `;
        return res.status(200).json({ message: 'Cart item quantity updated' });
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return res.status(500).json({ error: 'Server error' });
      }
    },
    
 
    getCartContents: async (c, req, res) => {
      const { user_id } = req.query;
    
      if (!user_id) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
    
      
      try {
        const cartContents = await sql`
          SELECT cart_id, product_id, quantity, price
          FROM carts
          WHERE user_id = ${user_id}
        `;
        return res.status(200).json(cartContents);
      } catch (error) {
        console.error('Error retrieving cart contents:', error);
        return res.status(500).json({ error: 'Server error' });
      }
    },
    
   
    getCartPrice: async (c, req, res) =>{
      const { user_id } = req.query;
    
      if (!user_id) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
    
      try {
        const totalPrice = await sql`
          SELECT SUM(quantity * price) AS total_price
          FROM carts
          WHERE user_id = ${user_id}
        `;
        return res.status(200).json(totalPrice[0]);
      } catch (error) {
        console.error('Error calculating cart total price:', error);
        return res.status(500).json({ error: 'Server error' });
      }
    },
    
    validationFail: async (c, req, res) => res.status(400).json({ err: c.validation.errors }),
    notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
  },
});

api.init();


app.use((req, res) => api.handleRequest(req, req, res));


app.listen(9000, () => console.info('API listening at http://localhost:9000'));

