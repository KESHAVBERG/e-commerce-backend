
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userroutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const cookieParser = require("cookie-parser")
dotenv.config();


mongoose.connect(process.env.url).then(()=>{
    console.log("Sucess")
}).catch((e)=>{
    console.log(e);
});


app.use(cookieParser());
app.use(express.json())
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userroutes);


 app.listen(8000, ()=>{
    console.log("Sever running");
 })