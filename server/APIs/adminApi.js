const exp=require('express')
adminApp=exp.Router()
const Venue=require('../models/venueModel')
const Request=require('../models/requestModel')
const UserAdmin=require('../models/userAdminModel')
const expressAsyncHandler=require('express-async-handler')
const createUserOrAdmin=require('./createUserOrAdmin')

//API
//create admin
adminApp.post('/admin',expressAsyncHandler(createUserOrAdmin))

//add new venues
adminApp.post('/venue',expressAsyncHandler(async (req,res)=>{
  const venueObj=req.body
  const newVenue=new Venue(venueObj)
  const newVenueObj=await newVenue.save()
  res.status(201).send({message:"New venue added",payload:newVenueObj})
}))

//get users
adminApp.get('/users',expressAsyncHandler(async (req,res)=>{
  let usersList=await UserAdmin.find({role:"user"})
  res.send({message:"users",payload:usersList})
}))

adminApp.get('/venues',expressAsyncHandler(async (req,res)=>{
  let venuesList= await Venue.find({isVenueActive:true})
  res.send({message:"venues",payload:venuesList})
}))

//delete(soft delete) venue
adminApp.put('/venue/:venueid',expressAsyncHandler(async(req,res)=>{
  const {venueid}=req.params
  const dbRes=await Venue.findOneAndUpdate({venueId:venueid},{$set:{isVenueActive:false}},{returnOriginal:false})
  res.status(200).send({message:"Venue deleted",payload:dbRes})
}))

adminApp.get('/requests',expressAsyncHandler(async (req,res)=>{
  let requestsList=await Request.find()
  res.send({message:"requests",payload:requestsList})
}))


module.exports=adminApp