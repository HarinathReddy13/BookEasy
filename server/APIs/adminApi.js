const exp=require('express')
adminApp=exp.Router()

//API
adminApp.get('/',(req,res)=>{
  res.send({message:"message from adminApi"})
})

module.exports=adminApp