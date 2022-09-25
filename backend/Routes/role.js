const express=require("express");
const { AddRole } = require("../Controller/roles");
const roleRouter=express.Router();


roleRouter.post("/",AddRole)

module.exports=roleRouter;