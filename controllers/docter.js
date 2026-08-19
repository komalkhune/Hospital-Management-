const docter=require("../models/docterm");
const nodemailer=require("nodemailer");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config()

const axios = require("axios");

exports.postdocter=(req, res)=>{

let Pass=req.body.Pass;
let Email=req.body.Email;
let Name=req.body.Name;

         console.log(Pass, Email, Name )



 let docterdatadata={Name, Specialist, Experience, Email, Fess, Education}=req.body

 bcrypt.hash(Pass,10).then((success)=>{

 let instance=new docter();
 instance.doterpostdata(docterdatadata, success)
   .then((success)=>{
 
 
         console.log(success)
 
           if(success.acknowledged===true){
 
            //  const transporter = nodemailer.createTransport({
            //      host: "smtp.gmail.com",
            //      port: 587,
            //      secure: false, 
            //      auth: {
            //        user: "khunekomal08@gmail.com",
            //        pass: "notwrpfavobzgkzg",
            //      },
            //  });  
 
            //   resend.emails.send({
            //    from: '"Hospital mail" <onboarding@resend.dev>', // sender address   <b>${Name}</b> 
            //    to: Email, // list of recipients
            //    subject: "About Registration", // subject line
            //    text: "", // plain text body
            //    html: `<h2> Registration Successful! </h2>
            //             <p> Dear <b> Dr. ${Name},</b>
            //              Your registration has been completed successfully.<br><br>                          
            //              Login Credentials:<br>                      
            //              Email: ${Email}<br>  
            //              Password: ${Pass} <br><br>                          
            //              Please keep your password confidential and do not share it with anyone. We recommend changing your password after your first login.                        
            //              Welcome to our Hospital Management System! `
            //    })

            axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
        sender: {
            name: "Hospital Mail",
            email: process.env.BREVO_FROM_EMAIL
        },

        to: [
            {
                email: Email,
                // name: `Dr. ${Name}`
            }
        ],

        subject: "About Registration",
        htmlContent: `<h2> Registration Successful! </h2>
                         <p> Dear <b> Dr. ${Name},</b>
                          Your registration has been completed successfully.<br><br>                          
                          Login Credentials:<br>                      
                          Email: ${Email}<br>  
                          Password: ${Pass} <br><br>                          
                          Please keep your password confidential and do not share it with anyone. We recommend changing your password after your first login.                        
                          Welcome to our Hospital Management System! `
         },
    {
        headers: {
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json"
        }
    }
)

                    .then((data) => {
                      if (data.error) {
                       console.log("Email failed:", data.error);
                      } else {
                         console.log("Email sent successfully:", data.data);
                     }
                    })
                    .catch((error) => {
                      console.log("Email sending error:", error);
                    });
 
         }      
 
       }).catch((error)=>{ 
           console.log(error);
           
       });


    // console.log(success)
 }).catch((error)=>{
    console.log(error)
 })
}


exports.dlogindata=(req, res)=>{ 

       let demail=req.body.email
     let dpass=req.body.password
     console.log("collection ten")
     console.log(demail, dpass)

  let instance=new docter();

  instance.identifipatient(demail)  

  .then((success)=>{
           console.log("successsssss",success)  
     
    if(success.length > 0){
        let hashedpass=success[0].Pass;
           console.log("hashedpass docter",hashedpass)  
      
        bcrypt.compare(dpass, hashedpass)  
        .then((dpassmatch)=>{
           console.log("dpassmatch",dpassmatch)  

            if(dpassmatch){
                const token=jwt.sign({
                    docterid:success[0]._id,
                    doctermail:success[0].Email
                }, process.env.JWT_SECRET)
    
                res.json({success:true,
                         token:token,
                          docterid:success[0]._id
                })

            }else{
             res.json({success:false})
            }

            
        }).catch((error)=>{
          console.log(error)
        })
    }
      
  }).catch((error)=>{
    console.log(error)
  })
}

exports.getsingledocter=(req, res)=>{

    console.log("Patient IDDDDD:", req.user.docterid);
    let did=req.user.docterid;

    let instance=new docter();

    instance.singledocter(did)
    .then((success)=>{
        console.log("docter name",success);
        res.json(success);
    }).catch((error)=>{
        console.log(error) 
    });

}


exports.getdocter=(req, res)=>{

    let instance=new docter();

    instance.doctergetdata()
    .then((success)=>{
        // console.log(success);
        res.json(success);
    }).catch((error)=>{
        console.log(error)
    });

}


exports.editdocter=(req, res)=>{

    let id=req.body._id;
            console.log("id", req.body._id);




    let updatedata={
        Name:req.body.Name,
        Specialist:req.body.Specialist,
        Experience:req.body.Experience,
        Fees:req.body.Fees,
        Education:req.body.Education,
    }

    console.log("updatedata", updatedata)

    let instance=new docter();

     instance.editdocterdata( id, updatedata)
     .then((success)=>{
        // console.log(success);
        // res.json(success);
    }).catch((error)=>{
        console.log(error)
    });

}

exports.deletedocter=(req, res)=>{

       let id=req.body._id;

    let instance=new docter();

     instance.deletedocterdata(id)
     .then((success)=>{
        // console.log(success);
        // res.json(success);
    }).catch((error)=>{
        console.log(error)
    });

}


exports.statuschange=(req, res)=>{
    let id= req.params.id;

    
      let instance=new docter();

     instance.updatestatus(id)
     .then((success)=>{  
        console.log("I want appoint",success.appointment);

        console.log("I want patient",success.patient);
        console.log("I want docter",success.docter);
        res.json(success);

        let pname=success.appointment.name;
        let reason=success.appointment.reason;

        console.log("pname",pname)
        let pemail=success.patient.email;
        console.log("pemail",pemail)


        let Dname=success.docter.Name;   
        // let pname=success.patient.docter.name;
        

        if(success){
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
              from: '"Hospital Appointment mail" <khunekomal08@gmail.com>', // sender address
              to: pemail, // list of recipients
              subject: "About Appointment", // subject line
              text: "", // plain text body
              html: `Dear, <h2>${pname} </h2><p>Your appointment has been successfully booked with <b> dr. ${Dname}</b> for ${reason} .</p> <br> Thank You. <br> Hospital Team.` , // HTML body
              });
        }

    }).catch((error)=>{ 
        console.log(error)  
    });
}


exports.postmedicine=(req, res)=>{

    let instance=new docter();
    instance.medicine(req.body)
    .then((success)=>{   
        // console.log(success);
    }).catch((error)=>{
        console.log(error)
    })
}

exports.getdocterappointdata=(req, res)=>{
   console.log("Logged-in user:", req.user);
    console.log("docterid IDDDDD:", req.user.docterid);
    console.log("doctermail Emailllll:", req.user.doctermail);
    let did=req.user.docterid

    let instance=new docter();

    instance.docterappointment(did)
    .then((success)=>{
      console.log("newdata",success)
      res.json(success)

    }).catch((error)=>{
      console.log(error)
    })

}

exports.addmedicine=(req, res)=>{

    let instance=new docter();

    instance.addmedicine(req.body)
     .then((success)=>{
      console.log("Addmedicinecontroler",success)
      res.json(success)

    }).catch((error)=>{
      console.log(error)
    })

}


exports.getallmedicine=(req, res)=>{

    let instance=new docter();

    instance.getallmedicine()
      .then((success)=>{
        console.log("allmedicune",success);
        res.json(success);
    }).catch((error)=>{
        console.log(error)
    });

}
