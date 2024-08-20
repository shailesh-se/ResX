const express =require("express");
const path = require("path");

const app=express();
const hbs=require("hbs");
// const jwt=require("jsonwebtoken");
const cookiesparser= require("cookie-parser");
const auth=require("./middleware/auth");

// app.use(express.static('../../templates/partials/images'));

require("./db/conn");
const Register1=require("./models/register2");
const Register=require("./models/registers");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const port =process.env.PORT || 3000;


const static_path =path.join(__dirname,"../public");
const template_path =path.join(__dirname,"../templates/views");
const partials_path =path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(cookiesparser());
app.use(express.urlencoded({extended:false}));



// console.log(path.join(__dirname,"../public"));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);

hbs.registerPartials(partials_path);



app.get("/",(req, res) => {

  const token = req.cookies.jwt;
  if (token) {
    res.render("index", { logoutButton: true });
   
    
  } else {
    res.render("index", { loginButton: true });
   
  }
});


app.get("/register",(req,res)=>{
  res.render("register");
})
app.get("/login",(req,res)=>{
  res.render("login");
})

app.get("/create",auth,(req,res)=>{
  res.render("create");

})

app.get("/logout",auth,async(req,res)=>{
  try {
    console.log(req.user);
    res.clearCookie("jwt");
    console.log("logout sussefully");

    await req.user.save();
    res.redirect("/");

  } catch (error) {
    res.status(500).send(error);
  }
})










//create a new user in the our database
app.post("/register",async(req,res)=>{
  try {
   
          const repe=req.body.email;
          const isNewUser = await Register.isThisEmailInUse(repe);
        
          if(!isNewUser)return res.json({
            success:false,
            message:'this email is already login please sighnup with new email id',
          });

      const password=req.body.password;
      const cpassword=req.body.cpassword;
      
      if(password===cpassword)
      {

          const registerEmployee=new Register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword,
            profession:req.body.profession
          })
         
       
          

          const token= await registerEmployee.generateAuthToken();
          console.log("the token part " + token);

          //the res.cookies () is used to set the cookies name to value
          //The value parameter may be a string or object converted into json

          res.cookie("jwt",token,{
            expires:new Date(Date.now()+30000),
            httpOnly:true
          });
          // console.log(cookie);

           

          // res.cookie()

        const registered =await registerEmployee.save();
        res.status(201).render("register");
       


      }else{
        res.send("your password is not matching with comfirm password try again");
      }
      

  } catch (error) {
    res.status(400).send(error);
  }
})


app.post("/login",async(req,res)=>{
    try{
      const email=req.body.email;
      const password =req.body.password;
      const name=await Register.findOne({email:email});
     
     
      const token= await name.generateAuthToken();

    
      console.log("the token part " + token);
  
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+60000000),
        httpOnly:true
        // secure:true
      
      });
      
  
        // console.log(`this is the cookies awesome ${req.cookies.jwt}`);
  
  
  
  
  
      if(name.password===password){
        
        res.status(201).redirect("/");
        }
      
      else{
        res.send("your information is not matching sir");
      }
  
    }
    catch(error){
      res.status(400).send("something wents wrong sir");
    }
  })



// ./templates/views/register.hbs
// ./templates/partials/login.hbs








const Register2 = require("./models/register2");
const createToken = async() =>{
  const token= await jwt.sign({_id:"641c36374d7f25bfc55a17b6"},"apoorvvikramsinghrathorepranshusinghrathoreorsbdokhahaimtsochojadakyakrnahaisbbekarhai",{
    expiresIn:"2 minutes"
  });
  expiresIm:"4sec";
  console.log(token)


const uservarification =await jwt.verify(token,"apoorvvikramsinghrathorepranshusinghrathoreorsbdokhahaimtsochojadakyakrnahaisbbekarhai");
console.log(uservarification);
}

createToken();
 














// app.post("/create", async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     const verifyUser = jwt.verify(
//       token,
//       "apoorvvikramsinghrathorepranhusinghrathorefromfbd"
//     );
//     const user = await Register.findOne({ _id: verifyUser._id });
//     req.token = token;
//     req.user = user;
//     console.log(user.email);

//     let registerEmployee1 = await Register2.findOne({ emailc: user.email });

//     if (!registerEmployee1) {
//       registerEmployee1 = new Register2({
//         namec: req.body.namec,
//         locationc: req.body.locationc,
//         emailc: user.email,
//         phonec: req.body.phonec,
//         collegec: req.body.collegec,
//         streamc: req.body.streamc,
//         caddressc: req.body.caddressc,
//         cpic: req.body.cpic,
//         addressc: req.body.addressc,
//         projectc: req.body.projectc,
//         skillc: req.body.skillc,
//         experincec: req.body.experincec,
//         addtionalc: req.body.addtionalc,
//         token: token,
//         imagec: req.body.imagec,
//       });
//     } else {
//       registerEmployee1.namec = req.body.namec;
//       registerEmployee1.locationc = req.body.locationc;
//       registerEmployee1.phonec = req.body.phonec;
//       registerEmployee1.collegec = req.body.collegec;
//       registerEmployee1.streamc = req.body.streamc;
//       registerEmployee1.caddressc = req.body.caddressc;
//       registerEmployee1.cpic = req.body.cpic;
//       registerEmployee1.addressc = req.body.addressc;
//       registerEmployee1.projectc = req.body.projectc;
//       registerEmployee1.skillc = req.body.skillc;
//       registerEmployee1.experincec = req.body.experincec;
//       registerEmployee1.addtionalc = req.body.addtionalc;
//       registerEmployee1.token = token;
      
//       registerEmployee1.imagec = req.body.imagec;
//     }

//     console.log(registerEmployee1);
//     const registered = await registerEmployee1.save();
//     res.status(201).redirect("template1");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });


  const multer = require('multer');
  const upload = multer({ dest: 'uploads/'});

  app.post("/create", upload.single('imagec'), async (req, res) => {
    try {
      const token = req.cookies.jwt;
      const verifyUser = jwt.verify(
        token,
        "apoorvvikramsinghrathorepranhusinghrathorefromfbd"
      );
      const user = await Register.findOne({ _id: verifyUser._id });
      req.token = token;
      req.user = user;
      console.log(user.email);
      console.log(req.file);
      let registerEmployee1 = await Register2.findOne({ emailc: user.email });
        
      if (!registerEmployee1) {
        registerEmployee1 = new Register2({
          
          namec: req.body.namec,
          locationc: req.body.locationc,
          about:req.body.about,
          emailc: user.email,
          phonec: req.body.phonec,
          collegec: req.body.collegec,
          streamc: req.body.streamc,
          addressc: req.body.addressc,
          projectc: req.body.projectc,
          skillc: req.body.skillc,
          experincec: req.body.experincec,
          addtionalc: req.body.addtionalc,
          token: token,
          hobby1:req.body.hobby1,
          skill1:req.body.skill1,
          imagec: {
            data: req.file.buffer,
            contentType: req.file.mimetype
          },
        });
      } else {
        registerEmployee1.about=req.body.about;
        registerEmployee1.namec = req.body.namec;
        registerEmployee1.locationc = req.body.locationc;
        registerEmployee1.phonec = req.body.phonec;
        registerEmployee1.collegec = req.body.collegec;
        registerEmployee1.streamc = req.body.streamc;
        registerEmployee1.addressc = req.body.addressc;
        registerEmployee1.projectc = req.body.projectc;
        registerEmployee1.skillc = req.body.skillc;
        registerEmployee1.experincec = req.body.experincec;
        registerEmployee1.addtionalc = req.body.addtionalc;
        registerEmployee1.token = token;
        registerEmployee1.hobby1=req.body.hobby1;
        registerEmployee1.skill1=req.body.skill1;
        if (req.file) {
          registerEmployee1.imagec = {
            data: req.file.buffer,
            contentType: req.file.mimetype
          };

        }
      }

      console.log(registerEmployee1);
      const registered = await registerEmployee1.save();
      res.status(201).redirect("template1");
    } catch (error) {
      res.status(400).send(error);
    }
  });
  // app.use(express.static('public'));
  // app.use('/uploads', express.static('uploads'));
  // app.get('/uploads/:id', async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const data = await Register2.findById(id);
  //     if (!data) {
  //       return res.status(404).send('No data found');
  //     }
  //     res.set('Content-Type', data.imagec.contentType);
  //     res.send(data.imagec.data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Error retrieving image');
  //   }
  // });






  // app.get("/template1", async (req, res) => {
  //   try {
  //     const token = req.cookies.jwt;
  //     const verifyUser = jwt.verify(
  //       token,
  //       "apoorvvikramsinghrathorepranhusinghrathorefromfbd"
  //     );
  //     const user = await Register.findOne({ _id: verifyUser._id });
  //     const data = await Register2.findOne({ emailc: user.email });
  //     if (!data) {
  //       return res.status(404).send("No data found");
  //     }
  //     // console.log("this is data i find from the computer an aeiga mja");
    
  //     res.render("template1", { data, imagePath: `../../uploads/${data._id}` });
     
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Error retrieving data");
  //   }
  // });


app.get("/template1", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(
      token,
      "apoorvvikramsinghrathorepranhusinghrathorefromfbd"
    );
    const user = await Register.findOne({ _id: verifyUser._id });
    const data = await Register2.findOne({ emailc: user.email });
    if (!data) {
      return res.status(404).send("No data found");
    }
    console.log(data); // Add this line to check if the data is coming back correctly
    res.render("template1", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});











 app.listen(port,()=>{
    console.log(`server is running on port no ${port}`)
 })
 