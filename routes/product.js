const { addProducts } = require("../controller/productController");
const { verifyTokenAndAdmin } = require("../middlewear/verifyToken");
const upload = require("../middlewear/imageUploader")
const router = require("express").Router();

router.post("/addproduct",verifyTokenAndAdmin,upload.array("img[]"),addProducts);

module.exports = router;