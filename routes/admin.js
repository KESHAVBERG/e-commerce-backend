const { findUser } = require("../controller/admincoller");
const { verifyTokenAndAdmin } = require("../middlewear/verifyToken");

const router = require("express").Router();

router.get("/finduser/:id", verifyTokenAndAdmin, findUser);
module.exports = router;