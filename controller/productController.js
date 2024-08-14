const productModel = require("../models/product");
const asyncHandler = require("express-async-handler");

exports.addProducts = asyncHandler(async(req, res)=>{
            const newProduct = new productModel({
                title:req.body.title,
                dec:req.body.dec,
                category:req.body.category,
                price:req.body.price,
            });
            if(req.files){
                let path = '';
                req.files.forEach(function(files, index, arr){
                    path = path + files.path + ","
                });
                path = path.substring(0, path.lastIndexOf(","));
                newProduct.img = path;
            }
            try{
                const savedProduct = await newProduct.save();
                return res.status(200).send(savedProduct);
            }catch(e){
                return res.status(400).send(e);
            }
});
