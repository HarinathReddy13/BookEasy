const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  profileImageUrl:{
    type:String
  }
},{"strict":"throw"})

const requestSchema= new mongoose.Schema({
  requestId:{
    type:String,
    required:true
  },
  userData:{
    type:userSchema,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  dateOfApplication:{
    type:Date,
    required:true
  },
  status:{
    type:String,
    enum:['pending','approved','rejected'],
    default:'pending'
  },
  additionalReq:{
    type:String
  },
  dateOfEvent:{
    type:Date,
    required:true
  },
  venueId:{
    type:String,
    required:true
  }
},{"strict":"throw"})

const Request=mongoose.model('request',requestSchema)

module.exports=Request