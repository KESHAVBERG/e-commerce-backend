const userModel = require('../models/user');
const asyncHandler = require("express-async-handler");
const crptoJS = require("crypto-js");


exports.register = asyncHandler(async(req,res)=>{
    var {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).send({error:"All fields are mandtory"});
    }
    const userExist =await userModel.findOne({email:email});
    if(userExist){
       return res.status(400).send({err:"user Exists"});
    }  
    const hashpassword = crptoJS.AES.encrypt(password, process.env.screatekey).toString();
    const newUser = await userModel.create({
        username:name,
        email:email,
        password:hashpassword,
    })
    if(newUser){
        return res.status(201).send(newUser);
    }

    return res.status(500).send({err:"user not created"})
})


exports.login = asyncHandler(async(req, res)=>{
    var {email, password} = req.body;
    const user =await userModel.findOne({email:email});
    if(!user){
        return res.status(401).send({error:"User Not found"});
    }
    const decryptedPasword = crptoJS.AES.decrypt(user.password, process.env.screatekey).toString(crptoJS.enc.Utf8);
    if(password !== decryptedPasword){
        return res.status(400).send({error:"Wrong password"});
    }

    return res.status(201).send(user);

})