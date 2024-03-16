import course from "../models/course.model";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"; 
import {ApiResponse} from "../utils/ApiResponse.js";
import mongoose from "mongoose";


const getCourse = asyncHandler(async(req,res)=>{

    const courses = await course.find();

    return res
    .status(200)
    .json(new ApiResponse(200, courses, "All courses"))

})

const courseTeacher = asyncHandler(async(req,res)=>{

    const coursename = req.body;

    if(!coursename){
        throw new ApiError(400, "Choose a course")
    }
    
    const Courses = await course.findOne({
        coursename
    })
    
    if(!Courses){
        throw new ApiError(400, "No course found")
    }

    const courseTeachers = await course.aggregate([
        {
          $match: {
            coursename 
          }
        },
        {
            $lookup: {
              from: "teachers",
              localField: "enrolledteacher",
              foreignField: "_id",
              as: "enrolledteacher" 
            }
        },
        {
            $project: {
              _id: 1,
              coursename: 1,
              enrolledteacher: {
                _id: 1,
                Firstname: 1,
                Lastname: 1
              }
            }
        }
    ])

    if (!courseTeachers || courseTeachers.length === 0) {
        throw new ApiError(400, "No teachers found for the specified course");
    }

    return res
    .status(200)
    .json( new ApiResponse(200, courseTeachers, "details fetched"))
    
})


const addCourse = asyncHandler(async(req,res)=>{
    const loggedTeacher = req.teacher

    const teacherParams = req.params.id

    if(!teacherParams){
      throw new ApiError(400,"Invalid user")
    }
 
    if(loggedTeacher._id != teacherParams){
      throw new ApiError(400,"not authorized")
    }

    const{coursename,description} = req.body

    //will add one more condition if same teacher already have a course on the subject (LATER)
    if ([coursename,description].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const newCourse = await course.create({
      coursename,
      description,
      enrolledteacher: loggedTeacher._id,
    })

    if(!newCourse){
      throw new ApiError(400, "couldnt create course")
    }

    return res
    .send(200)
    .json(new ApiResponse(200, {newCourse, loggedTeacher}, "new course created"))
    
})






