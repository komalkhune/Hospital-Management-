const express=require("express");
const bodyparser=require("body-parser");
const router=require("./router/router");
const session=require("express-session");

const cors=require("cors")

const app=express();

const mongoConnect=require("./utils/database").mongoConnect;

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(router);

app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: true,
    })
);

mongoConnect(()=>{
    app.listen(5001)  
      console.log("Server Running on Port 5001");
});

