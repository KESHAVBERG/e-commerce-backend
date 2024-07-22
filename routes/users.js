const {verifyTokenAndAuthorization} = require("../middlewear/verifyToken");
const {updateUserDetails} = require("../controller/authController")
// const {}
const router = require("express").Router();

router.post("/updatePassword/:id", verifyTokenAndAuthorization, updateUserDetails);
module.exports = router;