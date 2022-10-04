const express=require("express")
const { sendEmail } = require("../Controller/mail")
const mailRouter=express.Router()
mailRouter.post("/",sendEmail)
module.exports=mailRouter;