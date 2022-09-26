const serviceModel = require("../models/servicesschema");
const addService = (req, res) => {
  const { title, description, section, worker } = req.body;
  let statuseofService = "pending";
  // const Service=[title,description,section,employee,statuseofService,Date,iscompleted]
  //    Service=Service.array.forEach(element => {
  //     return Service[element]?req.body:" "
  //    });
  const customer = req.token.UserID;
  const newService = new serviceModel({
    title,
    description,
    customer,
    section,
    worker,
    statuseofService,
  });
  newService
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          success: true,
          message: "Service Created Successfully",
          service: result,
        });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Service not Created",
        error: error.message,
      });
    });
};
const getserviceByWorker=(req,res)=>
{
serviceModel.find({worker:req.token.UserID})

.then((result)=>
{
    if(!result.length)// mean there is no order for employee
    return res.status(400).json(" there is no order for you,at this time")

res.status(200).json({
    success: true,
     message: "My Orders",
    Orders: result,
})
})
.catch((error)=>
{
    res.status(400).json({
        success: false,
              error:error.message
    })

})
}
module.exports = { addService,getserviceByWorker };
