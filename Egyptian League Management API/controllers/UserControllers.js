const { validationResult } = require("express-validator");
const { User } = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1; //1 is default
    const skip = (page - 1) * limit;

    const Users = await User.find({}).limit(limit).skip(skip);
    res.json({ status: "success", data: { Users } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: "fail", data: { errors: errors.array() } });
  }
  const { firstname, lastname, email, password } = req.body;
  users.findOne({ email: req.body.email }, async (err, user) => {
    if (user) {
      return res
        .status(400)
        .json({ status: "fail", data: { email: "email already exists" } });
    }
  });

  //pass hashing

  const hashedpass = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedpass,
    });

    const savedUser = await user.save();

    //generate token
    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "10" }
    );
    savedUser.tokens.push(token);
    await savedUser.save();
    res
      .status(201)
      .json({ status: "success", data: { user: savedUser, token } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: "fail", data: { errors: errors.array() } });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", data: { email: "user not found" } });
    }

    const Matched = await user.compare(password, user.password);
    if (!Matched) {
      return res
        .status(401)
        .json({ status: "fail", data: { password: "incorrect password" } });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10" }
    );
    user.tokens.push(token);
    await user.save();
    res.json({ status: "success", data: { user, token } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
