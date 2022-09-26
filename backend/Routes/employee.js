const express=require("express")
const { addEmployee, loginEmployee } = require("../Controller/employee")
const authentication = require("../middleware/authentication ")
const authorization = require("../middleware/authorization")
const employeeRouter=express.Router()
employeeRouter.post("/",authentication,authorization("ADD_EMPOLYEE"),addEmployee)
employeeRouter.post("/login",loginEmployee)
module.exports=employeeRouter