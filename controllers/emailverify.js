const mailverify=require("../models/emailverifym");
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
require("dotenv").config()
const bcrypt=require("bcrypt")


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

             const transporter = nodemailer.createTransport({
                      host: "smtp.gmail.com",
                      port: 587,
                      secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                      auth: {
                        user: "khunekomal08@gmail.com",
                        pass: "notwrpfavobzgkzg",
                      },
                  });  
      
                  transporter.sendMail({
                    from: '"Hospital mail" <khunekomal08@gmail.com>', // sender address   <b>${Name}</b> 
                    to: Email, // list of recipients
                    subject: "About Verify", // subject line
                    text: `Your OTP is ${otp}`, // plain text body
                    html: ` <h2>Password Reset</h2>

                             <p>You requested to reset your password.</p>
                     
                             <p>Your verification OTP is:</p>
                     
                             <h2>${otp}</h2>
                     
                             <p>This OTP is valid for 5 minutes.</p>
                     
                             <p>If you did not request this, please ignore this email.</p> `
                    });


                      const token=jwt.sign({
                         patientemail:success[0].email
                       }, process.env.JWT_SECRET)
                    
                      console.log("token",token)
                              
                      //   res.json({success:true,
                      //    token:token, 
                      //    patientId: success[0]._id 
                      // });

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