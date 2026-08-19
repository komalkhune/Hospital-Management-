const admin=require("../models/admin");
const jwt=require("jsonwebtoken");
require("dotenv").config()


exports.alogindata=(req, res)=>{

   //   let instance=new admin();
    
      email=process.env.admemail;
  pass=process.env.admpass;
  console.log("admdata", email, pass)
  console.log(typeof(email))
  console.log(typeof(pass))


   const aemail=req.body.email;
     const apass=req.body.password;
  console.log(typeof(aemail))
  console.log(typeof(apass))



  console.log("admdata", aemail, apass)


     if(email===aemail && pass===apass){

      const token=jwt.sign({
         email:email
      },process.env.JWT_SECRET)

            console.log("token",token)


      res.json({success:true,
               token:token
      })
      console.log("admindatamatch")
     }else{
      res.json({success:false})
      console.log("admindatanotmatch")

     }
}

