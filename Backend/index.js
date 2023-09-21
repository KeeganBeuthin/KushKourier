const cors = require('cors');
const postgres = require('postgres')
const OpenAPIBackend = require('openapi-backend').default;
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.set('trust proxy', 1)
app.use(
  cors({
    origin: ["http://localhost:3000",'http://10.0.2.16',"http://10.0.2.2:5554","http://10.0.2.2:5555","http://localhost","http://192.168.39.115:9000","http://localhost/"],
    methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type, Authorization, credentials']
  })
);
const sql = postgres('postgres://postgres:hahaha@127.0.0.1:8080/rat')

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
                    cpassword: {type: 'string'}
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
      // Handle login logic here
      // You can access the request body using req.body
      // Example: const { username, password } = req.body;

      // Send a successful response
      res.status(200).json({ message: 'Login successful' });
    },
    registerUser: async (c, req, res) => {
      console.log(req.body)
      const {registerUsername,registerEmail,registerPassword,registerCpassword} = req.body;

      const usercheck= await sql`
      SELECT * FROM accounts WHERE username =${registerUsername}`

      const emailCheck= await sql`
      SELECT * FROM accounts WHERE email =${registerEmail}`

      if(registerPassword!==registerCpassword){
        console.log('password match failed')
        return res.status(400).json({error: 'password match failed'})
      }


      if(emailCheck.length===1){
        console.log('email already exists')
        return res.status(400).json({error:'email already exists'})
      }
    
      const hashPassword = await bcrypt.hash(registerPassword, 13)
      console.log('hash completed')

      const result = await sql`
      INSERT INTO accounts (username,email,password,created_on) VALUES (${registerUsername},${registerEmail},${hashPassword},now())
    `

    console.log(`new user created with username ${registerUsername} and email ${registerEmail}`)


    return res.status(200).json({registerUsername, registerEmail})
    },
    validationFail: async (c, req, res) => res.status(400).json({ err: c.validation.errors }),
    notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
  },
});

api.init();

// Use as express middleware
app.use((req, res) => api.handleRequest(req, req, res));

// Start server
app.listen(9000, () => console.info('API listening at http://localhost:9000'));
