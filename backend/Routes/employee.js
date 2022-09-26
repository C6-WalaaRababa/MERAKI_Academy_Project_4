const express=require("express")
const { addEmployee } = require("../Controller/employee")
const authentication = require("../middleware/authentication ")
const authorization = require("../middleware/authorization")
const employeeRouter=express.Router()
employeeRouter.post("/",authentication,authorization("ADD_EMPOLYEE"),addEmployee)
module.exports=employeeRouter