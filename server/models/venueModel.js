const mongooose=require('mongoose')

const venueSchema= new mongooose.Schema({
  name:{
    type:String,
    required: true
  },
  venueId:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  category:{
    type:String,
    enum:['Auditorium','Lab','Class','Sports area','Ground']
  },
  capacity:{
    type:Number,
    required:true
  },
  facilities:{
    type:[String]
  },
  rules:{
    type:[String]
  },
  picturesUrls:{
    type:[String]
  },
  isVenueActive:{
    type:Boolean,
    default:true
  }
},{"strict":"throw"})

const Venue=mongooose.model('venue',venueSchema)

module.exports=Venue