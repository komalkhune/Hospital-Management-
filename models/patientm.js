const {getdb}=require("../utils/database")
const { ObjectId } = require("mongodb");


class patient{

    //  post

       patientdata(pdata, pass){
       let db=getdb();
        

        return db.collection("patient").insertOne({name:pdata.name, email:pdata.email, pass:pass, mno:pdata.mno, gender:pdata.gender})
         .then((success)=>{
          //  console.log(success); 
           return success;
         }).catch((error)=>{
           console.log(error)
         });
    //  return results;
   }

   identifipatient(email){
    let db=getdb();

    return db.collection("patient").find({ email:email}).toArray()
        .then((success)=>{
            console.log("ka yete")
            console.log(success)
         return success;
        }).catch((error)=>{
            console.log(error)
        })
   }





   getpatient(){
    let db=getdb();

    return db.collection("patient").find().toArray();
    // .then((success)=>{
    //   console.log("model then");
    //   console.log(success);
    //   return success;
    // }).catch((error)=>{
    //   console.log(error);
    // })
   }


  // post

   appointdata(appointdata){
    let db=getdb();

    return db.collection("appoitdata").insertOne(appointdata)
    .then((success)=>{
    //   console.log(success);
      return success
    }).catch((error)=>{
      console.log(error)
    })
   }








   
   bookappointdata(bookappointdata){
    let db=getdb();

    return db.collection("appoitdata").insertOne(bookappointdata)
    .then((success)=>{
    //   console.log(success);
      return success
    }).catch((error)=>{
      console.log(error)
    })
   }













   getappoint(){

    let db=getdb();
    return db.collection("appoitdata").aggregate([
    {
        $addFields: {
            doctorObjId: {
                $toObjectId: "$docter"
            }
        }
    },
    {
        $lookup: {
            from: "docter",
            localField: "doctorObjId",
            foreignField: "_id",
            as: "doctorDetails"
        }
    },
    {
        $unwind: "$doctorDetails"
    }
   ]).toArray();

  }

 getmedicine(){
    let db=getdb();

    return db.collection("medicine").find().toArray();
   }


    editpatient(id, data){
        let db=getdb();

            console.log(id);


         return db.collection("patient").updateOne({ _id: new ObjectId(id) },{ $set: data })
        .then((success)=>{
            // console.log(success);
            return success
        }).catch((error)=>{
            console.log(error)
        })


    }

    // myappointment(pid){
    //     let db=getdb();

    //     returndb.collection("appoitdata")
    // }



    myappointment(pid) {

    let db = getdb();

    return db.collection("appoitdata").aggregate([

        // 1. Get only this patient's appointments
        {
            $match: {
                patientid: pid
            }
        },

        // 2. Convert doctor ID string to ObjectId
        {
            $addFields: {
                doctorObjId: {
                    $toObjectId: "$docter"
                }
            }
        },

        // 3. Join doctor collection
        {
            $lookup: {
                from: "docter",
                localField: "doctorObjId",
                foreignField: "_id",
                as: "doctorDetails"
            }
        },

        // 4. Convert doctorDetails array into object
        {
            $unwind: "$doctorDetails"
        }

    ]).toArray();
   }



   getmyprofile(myid){
    let db=getdb();
    console.log("myiiiddd", myid)

    return db.collection("patient").find({ _id: new ObjectId(myid) }).toArray()
    .then((success)=>{
        console.log("success", success)
        return success;
    }).catch((error)=>{
        console.log(error)
    })
   }


}

module.exports=patient;