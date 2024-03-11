import mongoose from "mongoose"

const courseSchema= new  mongoose.Schema({

enrolledStudents:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"student"

},

enrolledteacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Teacher"
},

coursename:{
    type:String,
    require:true,

},












},{timestamps:true})

const course= mongoose.model('course',courseSchema)

export default course;