const express=require("express")
const { sendEmail, registerEmail } = require("../Controller/mail")
const mailRouter=express.Router()
mailRouter.post("/",sendEmail)
mailRouter.post("/register",registerEmail)
module.exports=mailRouter;