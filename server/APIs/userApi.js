const exp=require('express')
userApp=exp.Router()
const UserAdmin=require('../models/userAdminModel')
const expressAsyncHandler=require('express-async-handler')
const createUserOrAdmin=require('./createUserOrAdmin')
const Request=require('../models/requestModel')

//API
//create user
userApp.post('/user',expressAsyncHandler(createUserOrAdmin))

//create a req
userApp.post('/request',expressAsyncHandler(async (req,res)=>{
  let reqObj=req.body
  const newReq=new Request(reqObj)
  const newReqObj=await newReq.save()
  res.status(201).send({message:"Request sent",payload:newReqObj})
}))

//modify req
userApp.put('/request/mod',expressAsyncHandler(async (req,res)=>{
  let modifiedReq=req.body
  const dbRes=await Request.findByIdAndUpdate(modifiedReq._id,{...modifiedReq},{returnOriginal:false})
  res.status(200).send({message:"Request modified",payload:dbRes})

}))
//get req 
userApp.get('/requests/:usrId',expressAsyncHandler(async (req,res)=>{
  const {usrId}=req.params
  let reqList=await Request.find({'userData.userId':usrId})
  res.status(200).send({message:"All the requests of the user",payload:reqList})
}))

//get userByEmail
userApp.get('/user/:emal',expressAsyncHandler(async (req,res)=>{
  const {emal}=req.params
  let user=await UserAdmin.findOne({email:emal})
  res.status(200).send({message:"user",payload:user})
}))

module.exports=userApp