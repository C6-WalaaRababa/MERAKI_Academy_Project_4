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
          employeeID: result._id,
            secction: result.section,
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
    const getallEmployee=(req,res)=>
    {
        employeeModel.find({})
  .populate("section","-_id -__v")
  .exec()
        .then((result)=>
        {
        
                res.status(200).json({
                    success: true,
                    message: `Employee at app`,
                    employees: result
                })
            
        })

        .catch((error)=>
        {
                res.status(400).json({
                    success: false,
                    error: error.message
                })
        })
      }

    const getEmployeeforSection=(req,res)=>
    {
        const nameofsection=req.query.namesection
        employeeModel.find({section:nameofsection})
        .populate("section","-_id -__v")
        .exec()
        .then((result)=>
        {
        if (!result.length)// mean there is no employee for user 
            { return res.status(400).json("no employee at section")}
            else
             {
                res.status(200).json({
                    success: true,
                    message: `Employee at this section :${nameofsection}`,
                    employees: result
                })
            }
        })

        .catch((error)=>
        {
                res.status(400).json({
                    success: false,
                    error: error.message
                })
        })
    }

    const findEmployee=(req,res)=>
    {
      const search=req.query.search
const regex=new RegExp(search,'gi', /*flags*/)
console.log(regex)
employeeModel.find({firstName:{$regex:regex}}

)
.then ((result)=>
{
  res.status(200).json({
    success: true,
    message: `Employee at maintanence app`,
    employees: result
})
})
.catch((error)=>
{
  res.status(400).json({
    success: false,
    error: error.message
})
})







    }



module.exports={addEmployee,loginEmployee,getallEmployee,getEmployeeforSection,findEmployee}