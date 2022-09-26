const employeeModel=require("../models/empolyeeschema")
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
module.exports={addEmployee}