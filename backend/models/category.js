const mongoose=require("mongoose")
const CategorySchema=new mongoose.Schema({
   tile:{type:String,required:true} 
})
module.exports=mongoose.model("Category",CategorySchema)