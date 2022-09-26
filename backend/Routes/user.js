const express=require("express");
const { register, login } = require("../Controller/user");
const userRouter=express.Router()
userRouter.post("/",register)
userRouter.post("/login",login)
module.exports=userRouter;

