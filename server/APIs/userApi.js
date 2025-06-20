const exp=require('express')
userApp=exp.Router()
const UserAdmin=require('../models/userAdminModel')

//API
userApp.get('/users',async (req,res)=>{
  let usersList=await UserAdmin.find()
  res.send({message:"users",payload:usersList})
})

module.exports=userApp