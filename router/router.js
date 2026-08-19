const express=require("express");
const { postpatient, getpatient, postappointdata, getappointdata, getmedicine, editpatient, sendmail, plogindata, getmyappointdata, getmyprofiledata, bookapointment } = require("../controllers/patient");
const { postdocter, getdocter, editdocter, deletedocter, statuschange, postmedicine, dlogindata, getsingledocter, getdocterappointdata, addmedicine, getallmedicine } = require("../controllers/docter");
const { alogindata } = require("../controllers/admin");

const Verifytoken=require("../middleware/auth");
const { emailverify, changepass } = require("../controllers/emailverify");



const router=express.Router();



router.post("/patient", postpatient)   
router.get("/getpatientdata", getpatient)
router.get("/getmyprofiledata", Verifytoken, getmyprofiledata)


router.post("/bookapointment", Verifytoken, bookapointment)

router.get("/getsingledocter", Verifytoken, getsingledocter)




router.post("/alogindata", alogindata)
router.post("/plogindata", plogindata)
router.post("/dlogindata", dlogindata)


router.post("/docterdata", postdocter) 
router.get("/getdocterdata", getdocter)   

router.post("/editdocter", editdocter)     
router.post("/deletedocter", deletedocter)  

router.post("/appoitdata", postappointdata)   
router.get("/getappointdata", getappointdata)   
router.get("/getmyappointdata", Verifytoken,  getmyappointdata)  
router.get("/getdocterappointdata", Verifytoken,  getdocterappointdata)    



router.post("/statuschange/:id", statuschange)  

router.post("/medicine", postmedicine)   

router.get("/getmedicine", getmedicine) 
   
router.post("/editpatient", editpatient)   

// router.get("/getappoints", getappoints)     

router.post("/sendmail", sendmail)    

router.post("/verifyemail", emailverify)

router.post("/changepass", Verifytoken, changepass)

router.post("/addmedicine", addmedicine)    

router.get("/getallmedicine", getallmedicine) 










router.get("/",(req,res)=>{
res.send("this is the signip app")
})


module.exports=router;
