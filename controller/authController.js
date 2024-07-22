const userModel = require('../models/user');
const asyncHandler = require("express-async-handler");
const crptoJS = require("crypto-js");
const jwtToken = require("jsonwebtoken");

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
    var {email, Userpassword} = req.body;
    const user =await userModel.findOne({email:email});
    if(!user){
        return res.status(401).send({error:"User Not found"});
    }
    const decryptedPasword = crptoJS.AES.decrypt(user.password, process.env.screatekey).toString(crptoJS.enc.Utf8);
    if(Userpassword !== decryptedPasword){
        return res.status(400).send({error:"Wrong password"});
    }
    const accessToken = jwtToken.sign({
        id:user._id,
        isAdmin:user.isAdmin,
    }, process.env.jwt_screate, {expiresIn:"3d"});

    const {password, ...others} = user._doc;

    return res.status(201).send({...others, accessToken:accessToken});

})

exports.updateUserDetails = asyncHandler(async (req,res)=>{
    if(req.body.password){
        req.body.password = crptoJS.AES.encrypt(password, process.env.screatekey).toString();
    }
    try{
    console.log(req.params.id)
    const updateduser = await userModel.findOneAndUpdate({_id:req.params.id},{
        $set:req.body,
    });
    return res.status(200).send(updateduser)
    }catch(e){
        return res.status(500).json(e);
    }
})