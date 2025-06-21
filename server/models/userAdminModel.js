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
  }
},{"strict":"throw"})

//create model
const UserAdmin=mongoose.model('useradmin',userAdminSchema)

module.exports=UserAdmin