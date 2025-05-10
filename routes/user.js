const express = require("express");
const { z } = require("zod");
const {UserModel} = require("../db")
const router = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("./middleware");

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
         return res.status(400).json({
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
    try{
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
        }
    }
    catch(err){
        res.status(404).json({message: "error"})
    }
   
    
})

const updateBody = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(16).optional()
})

router.put("/update",authMiddleware, async(req, res)=>{
    const {success}  = updateBody.safeParse(req.body);

    if(!success){
        res.status(400).json({
            message: "Invalid credentials"
        })
    }
try{
      await UserModel.updateOne({
        _id: req.userId }, req.body)

        res.status(200).json({
            message: "User updated"
        })
    }
catch(e){
    console.log("error while updating the user")
}
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or: [
        {firstname:{"$regex": filter, $options: "i"}},
        {lastname: {"$regex": filter, $options: "i"}}
        ]
    })
console.log(filter);
    res.json({
        user: users.map(user => ({
            firstName: user.firstname,
            lastName: user.lastname,
        }))
    })
})

module.exports = router;