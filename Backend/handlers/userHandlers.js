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

module.exports= {

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
}
 