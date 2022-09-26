const express=require("express")
const { addService, getserviceByWorker } = require("../Controller/service")
const authentication = require("../middleware/authentication ")
const authorization = require("../middleware/authorization")
const serviceRouter=express.Router()
serviceRouter.post("/",authentication,authorization("ADD_SERVICE"),addService)
serviceRouter.get("/employee",authentication,getserviceByWorker)
module.exports=serviceRouter;