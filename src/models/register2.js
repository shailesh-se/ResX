const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
// const jwt= require ("jsonwebtoken");

const employeschema1=new mongoose.Schema({
    namec:{
        type:String
    },
    about:{
        type:String
    },
    locationc:{
        type:String
    },
    emailc:{
        type:String
    },
    phonec:{
        type:String
    },
    collegec:{
        type:String
    },
    streamc:{
        type:String
    },
    caddressc:{
        type:String
    },
    cpic:{
        type:String
    },
    addressc:{
        type:String
    },
    projectc:{
        type:String
    },
    skillc:{
        type:String
    },
    experincec:{
        type:String
    },
    addtionalc:{
        type:String
    },
    token:{
        type:String
    },
    imagec: {
        data: Buffer,
        contentType: String
    },
    hobby1:{
        type:[String]
    },
    skill1:{
        type:[String]
    }
    
})



const Register2=new mongoose.model("resumedetailscollection",employeschema1);
// employeschema.plugin(uniqueValidator);
module.exports=Register2;