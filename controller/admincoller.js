const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");

// find user

exports.findUser = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.params.id });
    const { password, ...others } = user._doc;
    return res.status(203).send({ ...others });
  } catch (e) {
    return res.status(500).send({ err: e });
  }
});

// Find All users

exports.getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query.new;
  try {
    const users = query? 
    await userModel.find().limit(5).sort({_id:-1})
    :await userModel.find();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send({ erro: e });
  }
});

// Stats

exports.getStats = asyncHandler(async(req, res)=>{
  try{
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await userModel.aggregate(
      [
        {$match:{createdAt:{$gte: lastyear}}},
        {
          $project:{
            month:{$month:"$createdAt"},
          },
        },
        {
          $group:{
            _id: "$month",
            total:{$sum: 1}
          },
        },
      ]
    );
    return res.status(200).send(data);
  }catch(e){
    return res.status(500).send({error:e})
  }
})