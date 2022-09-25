const mongoose=require("mongoose")
const RolesModel=new mongoose.Schema(
    {
    role:{type:String,required:true},
    permissions:[{type:String,required:true}],
})
module.exports= mongoose.model("role",RolesModel)