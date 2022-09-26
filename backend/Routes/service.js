const express=require("express")
const { addService, getserviceByWorker, updateServiceByWorker } = require("../Controller/service")
const authentication = require("../middleware/authentication ")
const authorization = require("../middleware/authorization")
const serviceRouter=express.Router()
serviceRouter.post("/",authentication,authorization("ADD_SERVICE"),addService)
serviceRouter.get("/employee",authentication,getserviceByWorker)
serviceRouter.put("/:id/update",authentication,authorization("UPDATE_SERVICE"),updateServiceByWorker)
module.exports=serviceRouter;