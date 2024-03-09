import mongoose from "mongoose";


const studentEnrollmentSchema=new mongoose.Schema({
   
    
 student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"student"
 },
 course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course"

 }




})

const studentEnrollment=mongoose.model('studentEnrollment',studentEnrollmentSchema)

export default studentEnrollment;