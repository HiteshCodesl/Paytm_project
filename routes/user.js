const express = require("express");
const { z } = require("zod");
const {userModel} = require("../db")
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupbody = z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string().email().min(3),
        password: z.string().min(8).max(16)
})

router.get("/signup", async(req, res)=>{

    const {success} = signupbody.safeParse(req.body);
       if(!success){
        return res.status(404).json({
            message: "Invalid creadentials"
          })
        }

    const existingUser = await userModel.findOne({email: req.body.email})

      if(existingUser){
         return res.status(400).json({
            message: "Email Already exists"
        })
    }

    const user = await userModel.create({
        fristName: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)
})

const signinBody = z.object({
    email: z.string().email(),
    password: z.string()
})

router.get("/signin", async(req, res)=>{
   
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(403).json({
            message: "Invalid Credentials"
        })
    }
    const alreadyUser = await userModel.findOne(req.body.email, req.body.password);

    if(alreadyUser){
        const token = jwt.sign({
            id : user._id
        }, JWT_SECRET)
    

    res.json({
        token: token
    })
    return;
}
   return res.status(401).json({
    message: "Error while logged in"
   })
})

module.exports = router;