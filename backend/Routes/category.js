const express=require("express")
const { addcategory } = require("../Controller/category")
const categoryRouter=express.Router()
categoryRouter.post("/",addcategory)
module.exports=categoryRouter