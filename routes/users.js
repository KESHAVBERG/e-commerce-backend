const {verifyTokenAndAuthorization} = require("../middlewear/verifyToken");
const {updateUserDetails, deleteUser} = require("../controller/authController")
// const {}
const router = require("express").Router();

router.post("/updateUserDetails/:id", verifyTokenAndAuthorization, updateUserDetails);

router.delete("/deleteUser/:id", verifyTokenAndAuthorization,deleteUser)
module.exports = router;