const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const employeeSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
      lastName:{type:String,required:true ,unique:true},
      imgpath:{type:String},
age:{type:Number},
    city:{type:String},
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true,min:8},
    role:{type:mongoose.Schema.Types.ObjectId,ref:"roles"},
    section:{type:mongoose.Schema.Types.ObjectId,ref:"Category"}
})

employeeSchema.pre("save", async function()
{
    this.email=this.email.toLowerCase();
    this.password=await bcrypt.hash(this.password,10)
})
module.exports=mongoose.model("employee",employeeSchema)