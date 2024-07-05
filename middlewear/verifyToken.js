const jwt = require("jsonwebtoken");

const verifyJWTToken = (res,req,next)=>{
    const token = req.headers.token;
    if(token){
        jwt.verify(token, process.env.jwt_screate,(err, user)=>{
            console.log(user);
            if(err){
                res.status(403).send({error:"Not a Valid Token"});
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(401).send({error:"Your not authenticated"});
    }
}


module.exports = {verifyJWTToken}