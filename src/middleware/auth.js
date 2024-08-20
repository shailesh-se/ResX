const jwt = require("jsonwebtoken");
const Register =require("../models/registers");
const register= require("../../templates/views/register");


const auth = async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
       
        const verifyUser=jwt.verify(token,"apoorvvikramsinghrathorepranhusinghrathorefromfbd");
        
        // console.log(verifyUser);
        

        const user=await Register.findOne({_id:verifyUser._id});
        // console.log(user);
        
        req.token=token;
        req.user=user;
        
        // console.log(user.email);



        next();
       

    } catch (error) {
      
        res.status(401).redirect('/register');
    }
const express = require('express');
const app = express();

}
module.exports=auth;