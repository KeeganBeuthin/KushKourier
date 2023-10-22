//@flow
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
const endpoints = require('./endpoints'); 
const handlers = require('./handlers');


let redisClient = createClient()


redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "SessionStore:",
})

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


app.use(session({
  name: 'info',
  secret: 'sexxx',
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 360000000, path: '/', sameSite: 'lax', httpOnly: true, secure: false },
}));

const api = new OpenAPIBackend({
    definition: endpoints,
    handlers, 
  });
  
  api.init();
  
  app.use((req, res) => api.handleRequest(req, req, res));
  
  app.listen(9000, () => console.info('API listening at http://localhost:9000'));