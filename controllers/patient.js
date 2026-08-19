const patient=require("../models/patientm")
const nodemailer=require("nodemailer");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
require("dotenv").config()



exports.postpatient=(req, res)=>{

    
  console.log("Controller Called");

       console.log(req.body);
        let Name=req.body.name;
      let Email=req.body.email;
      let Pass=req.body.pass;

      let patientdata={name, email, mno, gender}=req.body

      console.log(Name,Email, Pass)

    bcrypt.hash(Pass,10).then((success)=>{

      let instance=new patient();
      let data = instance.patientdata(patientdata, success);
   
      data.then((success)=>{


        console.log(success)

          if(success.acknowledged===true){

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
              subject: "About Signing", // subject line
              text: "", // plain text body
              html: `<h2> Registration Successful ! </h2> <p>Thank you, <b>${Name}</b> for signing up with our Hospital Management System. Your account has been created successfully. We look forward to serving you.</p> `
              });

        }      

      }).catch((error)=>{ 
          console.log(error);
          
      });

    }).catch((error)=>{
      console.log(error)
    }) 
       
  
}

exports.plogindata=(req, res)=>{

       let pemail=req.body.email
     let ppass=req.body.password
     console.log("collection ten")
     console.log(pemail, ppass)

  let instance=new patient();

  instance.identifipatient(pemail)  

  .then((success)=>{
           console.log("successsssss",success)  
     
    if(success.length > 0){
        let hashedpass=success[0].pass;
           console.log("hashedpass",hashedpass)  
      
        bcrypt.compare(ppass, hashedpass)  
        .then((ppassmatch)=>{
          console.log("ppassmatch",ppassmatch) 
           
          if(ppassmatch){
            console.log("secret key",process.env.JWT_SECRET)
            const token=jwt.sign({
              patientid:success[0]._id,
              patientemail:success[0].email
            }, process.env.JWT_SECRET)

            console.log("token",token)
          

            res.json({success:true,
                token:token, 
                patientId: success[0]._id 
            });

          }else{
            res.json({
            success:false,
            })
          }

        }).catch((error)=>{
          console.log(error)
        })
    }
      
  }).catch((error)=>{
    console.log(error)
  })
}








exports.getpatient=(req, res)=>{
  let instance=new patient();
  instance.getpatient()
  .then((success)=>{
     console.log("collection ten")

    //  console.log(success)
       res.json(success);
  }).catch((error)=>{
    console.log(error)
  })
}

exports.postappointdata=(req, res)=>{

  let instance=new patient();
  instance.appointdata(req.body)
  .then((success)=>{
     res.json(success); 
  }).catch((error)=>{
    console.log(error);
  });
}









exports.bookapointment=(req, res)=>{
    console.log("Patient IDDDDD:", req.user.patientid);

    let pid=req.user.patientid;

        const bookappointmentData = {
        ...req.body.appointdata,
        patientid: pid
    };


  let instance=new patient();
  instance.bookappointdata(bookappointmentData)

  .then((success)=>{
    // console.log(success) 
  }).catch((error)=>{
    console.log(error);
  });
}








exports.getappointdata=(req, res)=>{
  let instance=new patient();

  instance.getappoint()
    .then((success)=>{
    //  console.log("collection ten")

    //  console.log(success)
       res.json(success);
  }).catch((error)=>{
    console.log(error)
  })

}


exports.getmedicine=(req, res)=>{
  let instance=new patient();

  instance.getmedicine()
    .then((success)=>{
    //  console.log("collection ten")

    //  console.log(success)
       res.json(success);
  }).catch((error)=>{
    console.log(error)
  })

}

exports.editpatient=(req, res)=>{

  let id=req.body._id
   console.log("id", req.body._id);

    let updatedata={
        name:req.body.name,
        email:req.body.email,
        pass:req.body.pass,
        mno:req.body.mno,
        gender:req.body.gender,
    }
    console.log("updatedata", updatedata)

  let instance=new patient();

  instance.editpatient(id, updatedata)
      .then((success)=>{
        // console.log(success);
        // res.json(success);
    }).catch((error)=>{
        console.log(error)
    });
}



exports.sendmail=(req, res)=>{
 let email=req.body.pemail;

//  req.session.email=email;

 console.log("sending mail",email)    
}



exports.getmyappointdata=(req, res)=>{
   console.log("Logged-in user:", req.user);
    console.log("Patient IDDDDD:", req.user.patientid);
    console.log("Patient Emailllll:", req.user.patientemail);
    let myid=req.user.patientid

    let instance=new patient();

    instance.myappointment(myid)
    .then((success)=>{
      console.log("newdata",success)
      res.json(success)

    }).catch((error)=>{
      console.log(error)
    })

}

exports.getmyprofiledata=(req, res)=>{
   console.log("Logged-in user:", req.user);
    console.log("Patient IDDDDD:", req.user.patientid);
    console.log("Patient Emailllll:", req.user.patientemail);
    let myid=req.user.patientid

    let instance=new patient();

    instance.getmyprofile(myid)
    .then((success)=>{
      console.log("myprofiledata",success)
      res.json(success)

    }).catch((error)=>{
      console.log(error)
    })

}