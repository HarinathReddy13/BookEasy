const UserAdmin=require('../models/userAdminModel')

async function createUserOrAdmin(req,res){
  const userAdmin=req.body
  const userInDb=await UserAdmin.findOne({email:userAdmin.email})
  if(userInDb!==null){
    res.status(200).send({message:'Existing',payload:userInDb})
  }else{
    let newUser=new UserAdmin(userAdmin)
    let newUserOrAdminDoc=await newUser.save()
    res.status(201).send({message:'Inserted',payload:newUserOrAdminDoc})
  }
}

module.exports=createUserOrAdmin