const { register, login } = require("../controller/authController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;