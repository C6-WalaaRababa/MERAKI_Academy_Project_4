const UserModel = require("../models/userschema");
const register= (req, res) => {
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
  user.save()
    .then((response) => {
      res
        .status(201)
        .json({
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
      res
        .status(500)
        .json({
          success: false,
          message: "Account not Created",
          error: error.message,
        });
        console.log(error)
    });
}


module.exports = { register }
