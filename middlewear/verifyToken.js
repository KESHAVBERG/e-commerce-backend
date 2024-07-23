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


const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyJWTToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).send({error:"Not a vaild function"});
        }
    })
}

// To check if the user is Admin

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyJWTToken(req, res, ()=>{
        if(req.user.isAdmin){
            next9();
        }else{
            res.status(500).send({error:"Not authorized as admin"});
        }
    })
}

module.exports = {verifyJWTToken, verifyTokenAndAuthorization}