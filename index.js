
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect(process.env.url).then(()=>{
    console.log("Sucess")
}).catch((e)=>{
    console.log(e);
})

 app.listen(8000, ()=>{
    console.log("Sever running");
 })