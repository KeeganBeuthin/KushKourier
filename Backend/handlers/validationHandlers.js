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
}

