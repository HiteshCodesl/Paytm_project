const express = require("express");
const { z } = require("zod");
const {UserModel} = require("../db")
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");


const signupbody = z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string().email(),
        password: z.string().min(8).max(16)
})

router.post("/signup", async(req, res)=>{
    const body = req.body;
    const {success} = signupbody.safeParse(req.body);

       if(!success){
        return res.status(404).json({
            message: "Invalid creadentials"
        })
        }
    
     const existingUser = await UserModel.findOne({email: req.body.email})

      if(existingUser){
         res.status(400).json({
            message: "Email Already exists"
        })
    }

    const user = await UserModel.create(body);

    const token = jwt.sign({
        userId:  user._id
    }, JWT_SECRET)

    return res.status(200).json({
      message : "user created successfully"
    })
})

const signinBody = z.object({
    email: z.string().email(),
    password: z.string()
})

router.post("/signin", async(req, res)=>{
   
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(403).json({
            message: "Invalid Credentials"
        })
    }
    const alreadyUser = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(alreadyUser){
        const token = jwt.sign({
            userId : alreadyUser._id
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