const RolesModel=require("../models/roleschema")
const AddRole=(req,res)=>
{
    const {role,permissions}=req.body;
    const newRole=new RolesModel({
        role,permissions
    })
    newRole.save(
    )
    .then((response)=>
    {
res.status(201).json({success: true,massage: "Success role created",role: response})
    })

    .catch((error)=>
    {
        error.status(400)
        res.json({success:false,massage: "Server error" })

    })
}
module.exports={AddRole}