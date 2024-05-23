import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
  email:{
    type:String,
    requried:true
  },
  otp:{
    type:String,
    required:true,
  },
  createdAt: { 
    type: Date, 
    expires: 1500,  //expires in 1500 seconds
    default: Date.now }
},{timestamps:true}
)

export default mongoose.model('otp',otpSchema);