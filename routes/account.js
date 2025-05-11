const express = require("express");
const { authMiddleware } = require("./middleware");
const { AccountModel } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const app = express();

router.get("/balance", authMiddleware, async(req, res)=>{ 

    const account = await AccountModel.findOne({
       userId: req.userId
    });

    res.json({
       balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req, res)=>{
           
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    const account =  await AccountModel.findOne({
        userId : req.userId
    }).session(session);

    if(!account || account.balance < amount){
    await session.abortTransaction();
   return res.status(404).json({message: "Insufficient fund"})
}

    const toAcccount = await AccountModel.findOne({
        userId: to
    }).session(session);

    if(!toAcccount){
        await session.abortTransaction();
       return res.status(404).json({message: "Invalid user"})
    }


    await AccountModel.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)

    await AccountModel.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session)

 await session.commitTransaction();
 res.status(200).json({message: "transaction successful"})

})


module.exports = router;