const express=require("express")
const { addService } = require("../Controller/service")
const authentication = require("../middleware/authentication ")
const authorization = require("../middleware/authorization")
const serviceRouter=express.Router()
serviceRouter.post("/",authentication,authorization("ADD_SERVICE"),addService)
module.exports=serviceRouter;