const employeeModel=require("../models/empolyeeschema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const addEmployee=(req,res)=>
{
    const { firstName, lastName, age, city, email, password, role ,section} = req.body;
    const newEmployee=new employeeModel({
       firstName, lastName, age, city, email, password, role ,section
    })

    newEmployee.save()
    .then((result)=>
    {
        res.status(201)
        .json({
          success: true,
          message: "Employee Profile Created Successfully",
          Employee: result,
        });
    })
    .catch((error)=>
    {
        res.status(500).json({
            success: false,
            message: "Account not Created",
            error: error.message,
          });
    })
}

const loginEmployee = (req, res) => {
    const { email, password } = req.body;
    employeeModel.findOne({ email: email })
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
          employee: result._id,
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
  
      });
    }
// const updateService=(req,res)=>
// {
// const {statuseofService,Date}=req.body;
// serviceModel.findByIdAndUpdate({"_id":req.params.id},{statuseofService,Date},{new:true})



module.exports={addEmployee,loginEmployee}