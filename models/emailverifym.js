const { Collection } = require("mongodb");
const {getdb}=require("../utils/database")


class mailverify{


    verifyemail(email){

         let db=getdb();
            console.log("verify email", email);



        return db.collection("patient").find({email:email}).toArray()
        .then((success)=>{
        console.log("emailmatch", success)
        return success;
    }).catch((error)=>{
        console.log(error)
    })

    }


    passchange(email, pass){

         let db=getdb();
            console.log("verify for pass cahnge email", email);
            console.log("pass for pass cahnge email", pass);

             return db.collection("patient").updateOne(
        { email: email },
        { $set: { pass: pass } }
    );

    
    }



}
module.exports=mailverify;