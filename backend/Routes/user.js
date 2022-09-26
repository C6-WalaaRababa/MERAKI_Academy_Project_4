const express=require("express");
const { register } = require("../Controller/user");
const userRouter=express.Router()
userRouter.post("/",register)
module.exports=userRouter;

