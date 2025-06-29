const mongoose=require('mongoose')
//define schema
const userAdminSchema=new mongoose.Schema({
  role:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  profileImageUrl:{
    type:String
  },
  status:{
    type:String,
    enum:['pending','approved','rejected'],
    default:'pending'
  },
  isActive:{
    type:Boolean,
    default:true
  },
  isProfileComplete:{
    type:Boolean,
    default:false
  },
  clubName:{
    type:String,
    required:true
  },
  clubCategory:{
    type:String,
    enum:['Cultural Club','Technical Club','Student Chapter'],
    required:true
  },
  clubPosition:{
    type:String,
    required:true
  }
},{"strict":"throw"})

//create model
const UserAdmin=mongoose.model('useradmin',userAdminSchema)

module.exports=UserAdmin