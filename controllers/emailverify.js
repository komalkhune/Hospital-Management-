const mailverify=require("../models/emailverifym");
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
require("dotenv").config()
const bcrypt=require("bcrypt")

const axios = require("axios");



exports.emailverify=(req, res)=>{

    let instance=new mailverify()

      let Email=req.body.email;

      instance.verifyemail(Email)
      .then((success)=>{
        console.log("collection uccsess",success)


      if(success.length>0){

        const email=success[0].email;
        console.log("eemmaaiill", email)

          const otp = Math.floor(100000 + Math.random() * 900000);  

          console.log("OTP:", otp);

            axios.post( "https://api.brevo.com/v3/smtp/email",{
               sender: {
                  name: "Hospital Mail",
                 email: process.env.BREVO_FROM_EMAIL
               },
          
             to: [
                {
                    email: Email,
                }
                 ],
          
              subject: "About Verify",
               htmlContent: ` <h2>Password Reset</h2>

                  <p>You requested to reset your password.</p>
                     
                  <p>Your verification OTP is:</p>
                     
                  <h2>${otp}</h2>
                     
                  <p>This OTP is valid for 5 minutes.</p>
                     
              <p>If you did not request this, please ignore this email.</p> `
              },
              {
                 headers: {
                  "api-key": process.env.BREVO_API_KEY,
                  "content-type": "application/json"
                 }
              }
            );


                 const token=jwt.sign({
                    patientemail:success[0].email
                 }, process.env.JWT_SECRET)
                    
                 console.log("token",token)
                              
                     

              const vdata={
                success:true,
                otp:otp,
                // email:email,
                token:token
              } 

          res.json(vdata)


        }else{
           res.json({success:false})
        }


      }).catch((error)=>{
        console.log(error)
      })

      console.log("fogetemail", Email)

    
}


exports.changepass=(req, res)=>{

  let instance=new mailverify()

  let token= req.user.patientemail;
  console.log(token)

  let pass= req.body.pass;
  console.log(pass)

  bcrypt.hash(pass,10).then((success)=>{

    console.log("haschngepass", success)


     instance.passchange(token, success)
  .then((success)=>{
  console.log("passchange",success)

      if (success.matchedCount > 0) {

         res.json({
             success: true,
         });

      } else {

         res.json({
             success: false,
         });
      }
    
  }).catch((error)=>{
  console.log(error)
  })


  }).catch((error)=>{
    console.log(error)
  })

 

}