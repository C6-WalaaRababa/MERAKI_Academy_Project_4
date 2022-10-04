const mongoose=require("mongoose")
const serviceSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    customer:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    section:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    worker:{type:mongoose.Schema.Types.ObjectId,ref:"employee"},
    statuseofService:{type:String},
    Date:{type:Date},
    Comment:{type:String}
}

)
module.exports=mongoose.model("service",serviceSchema)
