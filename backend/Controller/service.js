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
        Date:""
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
const getserviceByWorker = (req, res) => {
    serviceModel.find({ worker: req.token.employeeID })
    .populate("customer", " email firstName")
.exec()
        .then((result) => {

            if (!result.length)// mean there is no order for employee
            { return res.status(400).json(" there is no order for you,at this time") }
            else {
                res.status(200).json({
                    success: true,
                    message: "My Orders",
                    Orders: result,
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                error: error.message
            })

        })
}
getPendingServiceByWorker = (req, res) => {

//     serviceModel.find({ worker: req.token.employeeID statuseofService:"pending"})
//         .then((result) => {

//             if (!result.length)// mean there is no order for employee
//             { return res.status(400).json(" there is no order for you,at this time") }
//             else {
//                 res.status(200).json({
//                     success: true,
//                     message: "My State Orders",
//                     Orders: result,
//                 })
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 success: false,
//                 error: error.message
//             })

        // })
 }
const updateServiceByWorker = (req, res) => {
    const filter = req.body;
    Object.keys(filter).forEach((key) => {
      filter[key] == "" && delete filter[key];
    });
    const { statuseofService, Date } = req.body
    const pathService = req.params.id
    serviceModel.findByIdAndUpdate({ _id: pathService }, { statuseofService, Date}, { new: true })
        .then((result) => {
            res.status(201).json({ success: true, message: "orders updated Successfully", order: result })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                error: error.message
            })

        })
}
const updateServiceByuser = (req, res) => {
    const filter = req.body;
    Object.keys(filter).forEach((key) => {
      filter[key] == "" && delete filter[key];
    });
    const {Comment} = req.body
    const pathService = req.params.id
    serviceModel.findByIdAndUpdate({ _id: pathService }, {Comment}, { new: true })
    .populate("section", "title")
    .populate("worker", " imgpath firstName")
    .exec()
        .then((result) => {
            res.status(201).json({ success: true, message: "orders updated Successfully",
             order: result })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                error: error.message
            })

        })
}
const getservicesbyUser = (req, res) => 
{
    serviceModel.find({ customer: req.token.UserID })
    .populate("section", "title")
    .populate("worker", " imgpath firstName")
    .exec()
        .then((result) => 
        {
            if (!result.length)// mean there is no order for user 
            { return res.status(400).json("your order list  empty")}
            else
             {
                res.status(200).json({
                    success: true,
                    message: "My Orders",
                    Orders: result,
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
    const deletservicesbyUser = (req, res) => 
    { service=req.params.id
        serviceModel.findByIdAndDelete({_id:service})
        .then(()=>
        {
            res.status(200).json({
                success: true,
                message: "service is detleted",
               
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


module.exports = { addService, getserviceByWorker, updateServiceByWorker ,getservicesbyUser,deletservicesbyUser,updateServiceByuser}
