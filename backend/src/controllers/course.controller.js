import {course} from "../models/course.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"; 
import {ApiResponse} from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import {Sendmail} from "../utils/Nodemailer.js"


const getCourse = asyncHandler(async(req,res)=>{

    const courses = await course.find(
      {isapproved:true}
    );

    return res
    .status(200)
    .json(new ApiResponse(200, courses, "All courses"))

})

const getcourseTeacher = asyncHandler(async(req,res)=>{

    const coursename = req.params.coursename;

    if(!coursename){
        throw new ApiError(400, "Choose a course")
    }

    const courseTeachers = await course.find({ coursename, isapproved:true }).populate('enrolledteacher');



    if (!courseTeachers || courseTeachers.length === 0) {
        throw new ApiError(400, "No teachers found for the specified course");
    }

    return res
    .status(200)
    .json( new ApiResponse(200, courseTeachers, "details fetched"))
    
})


const addCourseTeacher = asyncHandler(async(req,res)=>{
    const loggedTeacher = req.teacher

    const teacherParams = req.params.id

    if(!teacherParams){
      throw new ApiError(400,"Invalid user")
    }
 
    if(loggedTeacher._id != teacherParams){
      throw new ApiError(400,"not authorized")
    }

    

    const{coursename,description, schedule} = req.body

    console.log(schedule)


    if(!schedule){
      throw new ApiError(400, "Schedule of the course is required.")
    }

    if ([coursename,description].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const schedules = await course.aggregate([
      {
        $match:{
          enrolledteacher:loggedTeacher._id
        }
      },
      {
        '$unwind': '$schedule'
      }, {
        '$project': {
          'schedule': 1, 
          '_id': 0
        }
      }
    ])

    let isconflict = false;
    for (let i = 0; i < schedule.length; i++) {
      for (const sch of schedules) {
        if (sch.schedule.day === schedule[i].day) {
          if (
            (schedule[i].starttime >= sch.schedule.starttime && schedule[i].starttime < sch.schedule.endtime) ||
            (schedule[i].endtime > sch.schedule.starttime && schedule[i].endtime <= sch.schedule.endtime) ||
            (schedule[i].starttime <= sch.schedule.starttime && schedule[i].endtime >= sch.schedule.endtime)
          ) {
            isconflict = true;
          }
        }
      }
    }
    
    if(isconflict){
      throw new ApiError(400, "Already enrolled in a course with the same timing.")
    }


    const newCourse = await course.create({
      coursename,
      description,
      schedule,
      enrolledteacher: loggedTeacher._id,
    })

    console.log(newCourse)

    if(!newCourse){
      throw new ApiError(400, "couldnt create course")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {newCourse, loggedTeacher}, "new course created"))
    
})


const addCourseStudent = asyncHandler(async(req,res)=>{
 
  const loggedStudent = req.Student

  const studentParams = req.params.id

  if(!studentParams){
    throw new ApiError(400, "no params found")
  }

  if(loggedStudent._id != studentParams){
    throw new ApiError(400, "not authorized")
  }

  const courseID = req.params.courseID
  
  if(!courseID){
    throw new ApiError(400, "select a course")
  }

  const thecourse = await course.findById(courseID) //

  const EC = thecourse.schedule

  const schedules = await course.aggregate([
    {
      $match:{
        enrolledStudent:loggedStudent._id
      }
    },
    {
      '$unwind': '$schedule'
    }, {
      '$project': {
        'schedule': 1, 
        '_id': 0
      }
    }
  ])

  let isconflict = false;
  for (let i = 0; i < EC.length; i++) {
    for (const schedule of schedules) {
      if (schedule.schedule.day === EC[i].day) {
        if (
          (EC[i].starttime >= schedule.schedule.starttime && EC[i].starttime < schedule.schedule.endtime) ||
          (EC[i].endtime > schedule.schedule.starttime && EC[i].endtime <= schedule.schedule.endtime) ||
          (EC[i].starttime <= schedule.schedule.starttime && EC[i].endtime >= schedule.schedule.endtime)
        ) {
          isconflict = true;
        }
      }
    }
  }

  
  if(isconflict){
    throw new ApiError(400, "Already enrolled in a course with the same timing.")
  }

  const alreadyEnrolled = await course.findOne({
    _id: courseID,
    enrolledStudent: loggedStudent._id
  });
  if(alreadyEnrolled){
    throw new ApiError(400,"already enrolled in this course")
  }

  const selectedCourse = await course.findByIdAndUpdate(courseID, 
    {
      $push: {
        enrolledStudent:loggedStudent._id
      }
    }, {
      new: true
    })

  if(!selectedCourse){
    throw new ApiError(400, "failed to add student in course schema")
  }

  const teacherID = selectedCourse.enrolledteacher

  const teacher = await Teacher.findByIdAndUpdate(teacherID,
    {
      $push: {
        enrolledStudent:loggedStudent._id
      }
    }, {
      new: true
  })

  await Sendmail(loggedStudent.Email, `Payment Confirmation for Course Purchase`, 
    `<html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50; text-align: center;">Payment Successful!</h1>
        <p style="font-size: 16px; text-align: center;">Dear ${loggedStudent.Firstname},</p>
        <p style="font-size: 16px; text-align: center;">We are pleased to inform you that your payment for the course has been successfully processed.</p>
         <p style="font-size: 16px;">You can start accessing the course immediately by logging into your account.</p>
        <p style="font-size: 16px;">Best regards,</p>
        <p style="font-size: 16px;"><strong>The Shiksharthee Team</strong></p>
        <p style="font-size: 14px;">&copy; 2024 Shiksharthee. All rights reserved.</p>
        </body>
    </html>`
  )

  return res
  .status(200)
  .json( new ApiResponse(200, {teacher, selectedCourse, loggedStudent}, "successfully opted in course"))
})

const enrolledcourseSTD = asyncHandler(async(req,res)=>{
  const stdID = req.params.id

  if(!stdID){
    throw new ApiError(400, "authorization failed")
  }

  if(stdID != req.Student._id){
    throw new ApiError(400, "params and logged student id doesnt match")
  }

  const Student = await course.find({ enrolledStudent: stdID }).select( "-enrolledStudent -liveClasses -enrolledteacher")

  if (!Student) {
      throw new ApiError(404, "Student not found");
  }

  return res
  .status(200)
  .json( new ApiResponse(200,Student, "student and enrolled course"))

})


const enrolledcourseTeacher = asyncHandler(async(req,res)=>{
  const teacherID = req.params.id

  if(!teacherID){
    throw new ApiError(400, "authorization failed")
  }

  if(teacherID != req.teacher._id){
    throw new ApiError(400, "params and logged teacher id doesnt match")
  }

  const teacher = await course.find({ enrolledteacher: teacherID }).select( "-enrolledStudent -liveClasses -enrolledteacher")

  if (!teacher) {
      throw new ApiError(404, "teacher not found");
  }

  return res
  .status(200)
  .json( new ApiResponse(200,teacher, "teacher and enrolled course"))
})

const addClass = asyncHandler(async(req,res) => {
  const {title, date, timing, link, status } = req.body

  const loggedTeacher = req.teacher

  if(!timing || !date){
    throw new ApiError(400, "All fields are required");
  }

  if ([title, link, status].some((field) => field?.trim() === "")) {
  throw new ApiError(400, "All fields are required");
  }

  const {courseId, teacherId } = req.params
  const dateObject = new Date(date);

  const enrolledTeacher = await course.findOne({
  _id: courseId,
  enrolledteacher: teacherId,
  isapproved:true,
  })
  

  if(!enrolledTeacher){
  throw new ApiError(400, "not authorized")
  }

  const cst = timing - 60;
  const cet = timing + 60;

  const conflictClass = await course.aggregate([
    {
      '$match': {
        'enrolledteacher': loggedTeacher._id,
      },
    },
    {
      '$unwind': '$liveClasses',
    },
    {
      '$match': {
        'liveClasses.date': dateObject,
        'liveClasses.timing': {
          '$gte': cst,
          '$lte': cet,
        },
      },
    },
    {
      '$project': {
        '_id': 0,
        'courseName': '$courseName',
        'liveClasses': 1,
      },
    },
  ]);


  if(conflictClass.length>0){
    throw new ApiError(400, "You already have another class for similar timing.")
  }

  const enrolledCourse = await course.findOneAndUpdate(
  { _id: courseId }, 
  { $push: { liveClasses: {title, date, timing, link, status } } },
  { new: true }  
  );
  
  if(!enrolledCourse){
  throw new ApiError(400, "error occured while adding the class")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, {enrolledCourse, loggedTeacher}, "class added successfully"))
})



const stdEnrolledCoursesClasses = asyncHandler(async(req,res)=>{
  const Student = req.Student

  

  const classes = await course.aggregate([
    {
      $match: {
        enrolledStudent: Student._id
      }
    },
    {
      $unwind: "$liveClasses"
    },
    {
      $sort: {
        "liveClasses.date": 1,
        "liveClasses.timing": 1
      }
    },
    {
      $group: {
        _id: "classes",
        liveClasses: { 
          $push: {
            coursename: "$coursename",
            title: "$liveClasses.title",
            timing: "$liveClasses.timing",
            link: "$liveClasses.link",
            status: "$liveClasses.status",
            date: "$liveClasses.date"
          }
        }
      }
    }
  ]);


  if(!classes){
    throw new ApiError(400, "couldn't fetch the classes")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, {Student, classes}, "fetched classes successfully"))
})

const teacherEnrolledCoursesClasses = asyncHandler(async(req,res)=>{
  const teacher = req.teacher

  const classes = await course.aggregate([
    {
      $match: {
        enrolledteacher: teacher._id
      }
    },
    {
      $unwind: "$liveClasses"
    },
    {
      $sort: {
        "liveClasses.date": 1,
        "liveClasses.timing": 1
      }
    },
    {
      $group: {
        _id: "classes",
        liveClasses: { 
          $push: {
            coursename: "$coursename",
            title: "$liveClasses.title",
            timing: "$liveClasses.timing",
            link: "$liveClasses.link",
            status: "$liveClasses.status",
            date: "$liveClasses.date"
          }
        }
      }
    }
  ]);

  if(!classes){
   throw new ApiError(400, "couldn't fetch the classes")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, {teacher, classes}, "fetched classes successfully"))
})


const canStudentEnroll = asyncHandler(async(req,res)=>{
  const loggedStudent = req.Student

  const studentParams = req.params.id

  if(!studentParams){
    throw new ApiError(400, "no params found")
  }

  if(loggedStudent._id != studentParams){
    throw new ApiError(400, "not authorized")
  }

  const courseID = req.params.courseID
  
  if(!courseID){
    throw new ApiError(400, "select a course")
  }

  const thecourse = await course.findById(courseID) //

  const EC = thecourse.schedule

  const schedules = await course.aggregate([
    {
      $match:{
        enrolledStudent:loggedStudent._id
      }
    },
    {
      '$unwind': '$schedule'
    }, {
      '$project': {
        'schedule': 1, 
        '_id': 0
      }
    }
  ])

  let isconflict = false;
  for (let i = 0; i < EC.length; i++) {
    for (const schedule of schedules) {
      if (schedule.schedule.day === EC[i].day) {
        if (
          (EC[i].starttime >= schedule.schedule.starttime && EC[i].starttime < schedule.schedule.endtime) ||
          (EC[i].endtime > schedule.schedule.starttime && EC[i].endtime <= schedule.schedule.endtime) ||
          (EC[i].starttime <= schedule.schedule.starttime && EC[i].endtime >= schedule.schedule.endtime)
        ) {
          isconflict = true;
        }
      }
    }
  }

  
  if(isconflict){
    throw new ApiError(400, "Already enrolled in a course with the same timing.")
  }

  const alreadyEnrolled = await course.findOne({
    _id: courseID,
    enrolledStudent: loggedStudent._id
  });
  if(alreadyEnrolled){
    throw new ApiError(400,"already enrolled in this course")
  }
  return res.status(200).json(new ApiResponse(200, {}, "student can enroll"))
})

export {getCourse, getcourseTeacher, addCourseTeacher, addCourseStudent, enrolledcourseSTD, enrolledcourseTeacher, addClass, stdEnrolledCoursesClasses, teacherEnrolledCoursesClasses, canStudentEnroll} 






