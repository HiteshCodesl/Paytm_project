const express = require("express");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")

export const authMiddleware = (req, res, next)=>{
   const token = req.headers[authorization];

   const decoded = jwt.verify(token, JWT_SECRET);

   if(decoded){
    req.userId = decoded.userId;
    next();
   }
   else{
    return res.status(403).json({
        message: "invalid creds"
    })
   }
}