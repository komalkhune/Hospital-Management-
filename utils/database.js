const mongodb=require("mongodb")
const MongoClient=mongodb.MongoClient;
let _db;

const mongoconnect=(callback)=>{
    MongoClient.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.7.0")
    .then((success)=>{
        console.log(success)
        _db=success.db("mydatabace");
        console.log("Database Connected Successfully")
    }).catch((error)=>{
        console.log(error);
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