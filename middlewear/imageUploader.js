const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "itemImages/");
    },
    filename:function(req, file, cb){
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext)
    }
})
const upload = multer({
    storage:storage,
    fileFilter:function(req, file, callback){
        if(file.mimetype == "image/png"||file.mimetype == "image/jpg"){
            callback(null, true);
        }else{
            console.log("not a vaile type");
            callback(null, false)
        }
    }
})

module.exports = upload;