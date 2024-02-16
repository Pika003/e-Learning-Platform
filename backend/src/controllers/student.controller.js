import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {student} from "../models/student.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const signup = asyncHandler(async (req, res) =>{
    
    const{Firstname, Lastname, Email, Password} = req.body;

    
    if(
        [Firstname, Lastname, Email, Password].some((field)=> 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    
    const existedStudent = await student.findOne({ email: req.body.email });

    if(existedStudent){
        throw new ApiError(400, "Student already exist")
    }

    
    const newStudent = await student.create({
        Email,
        Firstname,
        Lastname,
        Password,
    })

    const createdStudent = await student.findById(newStudent._id).select(
        "-Password "
    ) 

    if(!createdStudent){
        throw new ApiError(501, "Student registration failed")
    }
    return res.status(200).json(
        new ApiResponse(200, createdStudent, "Signup successfull")
    )

})


export{
    signup,
}