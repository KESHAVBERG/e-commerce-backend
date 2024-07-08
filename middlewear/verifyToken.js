const jwt = require("jsonwebtoken");

const verifyJWTToken = (req,res,next)=>{
    const authToken = req.headers.token;
    if(authToken){
        jwt.verify(authToken, process.env.jwt_screate,(err, user)=>{
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