const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const jwt= require ("jsonwebtoken");

const employeschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    profession:{
        type:String,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})

//generate tokem we don't use fat arrow function because we want to play with this function so we use this 
employeschema.methods.generateAuthToken=async function(){
try {
    console.log(this._id);
    const token=jwt.sign({_id:this._id.toString()},"apoorvvikramsinghrathorepranhusinghrathorefromfbd");
    this.tokens=this.tokens.concat({token:token})
   await this.save();
   
    return token;
} catch (error) {
    res.send("something wents wrong in your website please check then shi karo usse");
    console.log("something wents wrong in your website please check then shi karo usse");

}
}



//FOR EMAIL NOT MORE THEN ONE SAME EMAIL USER CAN LOGIN IN THIS EMAIL ID,
employeschema.statics.isThisEmailInUse = async function(email){
    try {
        const user=await this.findOne({email});
        if(user) return false
        return true;
    } 
    catch (error) {
        console.log('is error is inside the static method') 
        return false
    }

    
}



//now we create a collections

const Register=new mongoose.model("Resumeregistrationwork",employeschema);
// employeschema.plugin(uniqueValidator);
module.exports=Register;