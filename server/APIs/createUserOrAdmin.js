const UserAdmin=require('../models/userAdminModel')

async function createUserOrAdmin(req,res){
  const userAdmin=req.body
  const userInDb=await UserAdmin.findOne({email:userAdmin.email})
  if(userInDb!==null){
    if(userInDb.role===userAdmin.role){
      res.status(200).send({message:userAdmin.role,payload:userInDb})
    }else{
      res.status(200).send({message:"Invalid role"})
    }
  }else{
    let newUser=new UserAdmin(userAdmin)
    let newUserOrAdminDoc=await newUser.save()
    res.status(201).send({message:newUserOrAdminDoc.role,payload:newUserOrAdminDoc})
  }
}

module.exports=createUserOrAdmin