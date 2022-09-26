const UserModel = require("../models/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { firstName, lastName, age, city, email, password, role } = req.body;
  const user = new UserModel({
    firstName,
    lastName,
    age,
    city,
    email,
    password,
    role,
  });
  user
    .save()
    .then((response) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        customer: response,
      });
    })
    .catch((error) => {
      if (error.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: "Account not Created",
        error: error.message,
      });
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
  .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        res.status(404);
        res.json({ success: false, message: " The email doesn't exist" });
      }
      try {
        const checkofpassword = await bcrypt.compare(password, result.password);
        if (!checkofpassword) {
          res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          UserID: result._id,
          Country: result.country,
          role: result.role,
        };
        const option = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, option);
        res.status(200);
        res.json({
          success: true,
          message: "Valid login credentials",
          token: token,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "Server Error",
        err: error.message,
      });
      console.log(error);
    });
};

module.exports = { register, login };
