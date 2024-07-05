const {verifyJWTToken} = require("../middlewear/verifyToken");

const router = require("express").Router();

router.post("/:id", verifyJWTToken, (req, res)=>{

})
module.exports = router;