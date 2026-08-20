const mongodb=require("mongodb")
const MongoClient=mongodb.MongoClient;
let _db;

const mongoconnect=(callback)=>{
    // MongoClient.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.7.0")
    MongoClient.connect("mongodb+srv://komalkhune_08:komal4093@cluster0.r4iesua.mongodb.net/?appName=Cluster0")

    .then((success)=>{
        console.log(success)
        _db=success.db("mydatabace");
        console.log("Database Connected Successfully")
    }).catch((err)=>{
        console.log(err);
    });
    callback();
}

const getdb=()=>{
    if(_db){
        return _db;
    }else{
        console.log("Database Not Connected")
    }
}

exports.mongoConnect=mongoconnect;
exports.getdb=getdb;