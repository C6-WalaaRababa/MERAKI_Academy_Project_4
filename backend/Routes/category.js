const express=require("express")
const { addcategory } = require("../Controller/category")
const authentication = require("../middleware/authentication ")
const authorization = require("../middleware/authorization")
const categoryRouter=express.Router()
categoryRouter.post("/",authentication,authorization("ADD_CATEGORY"),addcategory)
module.exports=categoryRouter