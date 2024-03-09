import mongoose from "mongoose";


const teacherenrollmentSchema=new mongoose.Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"

    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }
})
const teacherenrollment=mongoose.Schema('teacherenrollment',teacherenrollmentSchema);


export default teacherenrollment;