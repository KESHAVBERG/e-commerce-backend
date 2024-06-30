
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userroutes = require('./routes/users')


dotenv.config();


mongoose.connect(process.env.url).then(()=>{
    console.log("Sucess")
}).catch((e)=>{
    console.log(e);
});



app.use(express.json())
app.use("/api/userRoutes", userroutes);


 app.listen(8000, ()=>{
    console.log("Sever running");
 })