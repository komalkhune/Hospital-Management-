const { ObjectId } = require("mongodb");
const {getdb}=require("../utils/database");

class docter{

    doterpostdata(ddata, dpass){
        let db=getdb();

        return db.collection("docter").insertOne({Name:ddata.Name, Specialist:ddata.Specialist, Experience:ddata.Experience, Email:ddata.Email, Pass:dpass, Fees:ddata.Fees, Education:ddata.Education,})
        .then((success)=>{
            // console.log(success);
            return success;
        }).catch((error)=>{
            console.log(error)
        })
    }

      identifipatient(email){
    let db=getdb();

    return db.collection("docter").find({ Email:email}).toArray()
        .then((success)=>{
            console.log("ka yete")
            console.log(success)
         return success;
        }).catch((error)=>{
            console.log(error)
        })
   }

   
    singledocter(did){
        let db=getdb();

        return db.collection("docter").find({ _id: new ObjectId(did)}).toArray()
        .then((success)=>{
            return success;
        }).catch((error)=>{
            console.log(error)
        })
    }



    doctergetdata(){
        let db=getdb();

        return db.collection("docter").find().toArray();
    }



     editdocterdata(id, data){
        let db=getdb();

            console.log(id);


         return db.collection("docter").updateOne({ _id: new ObjectId(id) },{ $set: data })
        .then((success)=>{
            // console.log(success);
            return success
        }).catch((error)=>{
            console.log(error)
        })


    }


    deletedocterdata(id){

         let db=getdb();

         return db.collection("docter").deleteOne({ _id: new ObjectId(id)})
        .then((success)=>{
            // console.log(success);
            return success
        }).catch((error)=>{
            console.log(error)
        })


    }


    
    updatestatus(id){

         let db=getdb();

         return db.collection("appoitdata").updateOne({ _id: new ObjectId(id) },{$set:{status:"Approved"}})
        .then((success)=>{
            console.log(success);
           
            if (success.modifiedCount > 0) {
                return db.collection("appoitdata").findOne({ _id: new ObjectId(id) });
            }
           
        }).then((appointment) => {

            //  return appointment;

            if (!appointment) 
                
                return null;

             return Promise.all([

                 Promise.resolve(appointment),

                db.collection("patient").findOne({
                    _id: new ObjectId(appointment.patientid)
                }),

                db.collection("docter").findOne({
                    _id: new ObjectId(appointment.docter)
                })

            ]);

        }).then(([appointment, patient, docter]) => {


            return {appointment, patient, docter};

        }).catch((error)=>{
            console.log(error)
        })
    }


    medicine(mdata){

        let db=getdb();
        return db.collection("medicine").insertOne(mdata)
        .then((success)=>{
            // console.log(success);
            return success;
        }).catch((error)=>{
            console.log(error)
        })

    }



      docterappointment(did){
    let db=getdb();
    console.log("did", did)

    return db.collection("appoitdata").find({ docter: did }).toArray()
    .then((success)=>{
        console.log("docterappoint", success)
        return success;
    }).catch((error)=>{
        console.log(error)
    })
   }

   addmedicine(medicines){
    let db=getdb();

    return db.collection("medicinestore").insertOne(medicines)
     .then((success)=>{
        console.log("Medicineaddmodel", success)
        return success;
    }).catch((error)=>{
        console.log(error)
    })
   }

   getallmedicine(){
     let db=getdb();

    return db.collection("medicinestore").find().toArray()
     .then((success)=>{
        console.log("allmedicinemodel", success)
        return success;
    }).catch((error)=>{
        console.log(error)
    })   }




}
module.exports=docter;  

   


