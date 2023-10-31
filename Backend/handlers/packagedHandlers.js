
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

const cartHandlers = require('./cartHandlers');
const validationHandlers = require('./validationHandlers');
const productHandlers = require('./productHandlers');
const userHandlers = require('./userHandlers');

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "SessionStore:",
});


module.exports = {
    ...cartHandlers,
    ...productHandlers,
    ...userHandlers,
    ...validationHandlers,
}
  
