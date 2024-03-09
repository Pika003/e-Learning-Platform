import moonguse from "mongoose"
import { student } from "./student.model"
import { Teacher } from "./teacher.model"


const courseSchema= new  moonguse.Schema({

enrolledStudents:{
    type:moonguse.Schema.Types.ObjectId,
    ref:"student"

},

enrolledteacher:{
    type:moonguse.Schema.Types.ObjectId,
    ref:"Teacher"
},

coursename:{
    type:String,
    require:true,

},












},{timestamps:true})

const course= moonguse.model('course',courseSchema)

export default course;