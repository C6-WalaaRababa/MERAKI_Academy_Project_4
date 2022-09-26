const serviceModel=require("../models/servicesschema")
const addService=(req,res)=>
{
const {title,description,section,employee}=req.body
let statuseofService="pending";
// const Service=[title,description,section,employee,statuseofService,Date,iscompleted]
//    Service=Service.array.forEach(element => {
//     return Service[element]?req.body:" "
//    });
    const customer= req.token.UserID
    const newService=new serviceModel({
        title,description,customer,section, employee, statuseofService
    })
    newService.save()
    .then((result)=>
    {
res.status(201).json({success: true,message: "Service Created Successfully",service:result})
    })
    .catch((error)=>
    {
        res.status(500).json({
            success: false,
            message: "Service not Created",
            error: error.message,
          });
    })
}
module.exports={addService}