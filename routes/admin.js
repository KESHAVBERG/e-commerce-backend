const { findUser, getAllUsers, getStats } = require("../controller/admincoller");
const { verifyTokenAndAdmin } = require("../middlewear/verifyToken");

const router = require("express").Router();

router.get("/finduser/:id", verifyTokenAndAdmin, findUser);
router.get("/getAllUsers", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getStats)

module.exports = router;