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
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ erro: e });
  }
});
