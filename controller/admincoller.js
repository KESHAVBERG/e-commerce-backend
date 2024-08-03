const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");


// find user

exports.findUser = asyncHandler(async(req, res)=>{
        try{
            const user = await userModel.findById({_id:req.params.id});
            return res.status(203).send(user);
        }catch(e){
            return res.status(500).send({err:e});
        }
    }
);