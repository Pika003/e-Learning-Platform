import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { admin } from "../models/admin.model.js";
import { student, studentdocs } from "../models/student.model.js";
import { Teacher, Teacherdocs } from "../models/teacher.model.js";


const adminSignUp = asyncHandler(async(req,res)=>{
    const {username, password} = req.body

    if([username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedAdmin = await admin.findOne({ username})

    if(existedAdmin){
        throw new ApiError(400, "admin already exist")
    }

    const newAdmin = await admin.create({
        username,
        password,
    })

    if(!newAdmin){
        throw new ApiError(400, "failed to add admin")
    }

    return res 
    .status(200)
    .json(new ApiResponse(400,{}, "admin added successfully"))

})

const generateAccessAndRefreshTokens = async (admindID) =>{ 
    try {
        
        const Admin = await admin.findById(admindID)
        
        const Accesstoken = Admin.generateAccessToken()
        const Refreshtoken = Admin.generateRefreshToken()

        Admin.Refreshtoken = Refreshtoken
        await Admin.save({validateBeforeSave:false})

        return{Accesstoken, Refreshtoken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const adminLogin = asyncHandler(async(req,res)=>{

    const {username, password} = req.body

    if([username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const loggedAdmin = await admin.findOne({username})

    if(!loggedAdmin){
        throw new ApiError(400, "admin does not exist")
    }

    const passwordCheck = await loggedAdmin.isPasswordCorrect(password)

    if(!passwordCheck){
        throw new ApiError(400, "Password is incorrect")
    }

    const temp_admin = loggedAdmin._id

    const {Accesstoken, Refreshtoken} =  await generateAccessAndRefreshTokens(temp_admin)

    const loggedadmin = await admin.findById(temp_admin).select("-password -Refreshtoken")

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res 
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .cookie("Refreshtoken", Refreshtoken, options)
    .json(new ApiResponse(200,{admin:loggedadmin}, "logged in successfully"))
})

const adminLogout = asyncHandler(async(req,res)=>{

    await admin.findByIdAndUpdate(
        req.Admin._id,
        {
            $set:{
                Refreshtoken:undefined,
            }
        },
        {
            new:true
        }
    )
    const options ={
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .clearCookie("Accesstoken", options)
    .clearCookie("Refreshtoken",  options)
    .json(new ApiResponse(200, {}, "admin logged out"))
})

const forApproval = asyncHandler(async(req,res)=>{

    const adminID = req.params.adminID

    if(!adminID){
        throw new ApiError(400, "not authorized")
    }

    const loggedAdmin = await admin.findById(adminID)

    if(!loggedAdmin){
        throw new ApiError(400, "admin not found")
    }

    // check if email verified or not

    const studentsforApproval = await student.find({
        Isapproved: "pending",
        Isverified: true
    })

    const teachersforApproval = await Teacher.find({
        Isapproved: "pending",
        Isverified: true
    })

    if(!studentsforApproval && !teachersforApproval){
        return res
        .status(200)
        .json(new ApiResponse(200, loggedAdmin, "No pending student or teacher"))
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{admin:loggedAdmin, studentsforApproval
    , teachersforApproval}, "fetched successfully"))
})

const approveStudent = asyncHandler(async(req,res)=>{

    const adminID = req.params.adminID

    if(!adminID){
        throw new ApiError(400, "not authorized")
    }

    const loggedAdmin = await admin.findById(adminID)

    if(!loggedAdmin){
        throw new ApiError(400, "admin not found")
    }


    const studentID = req.params.studentID

    if(!studentID){
        throw new ApiError(400, "student id is required")
    }

    const toApprove = req.body.Isapproved

    const remarks = req.body.remarks || null
    

    if (!toApprove || (toApprove != "approved" && toApprove != "rejected" && toApprove !== "reupload")) {
        throw new ApiError(400, "Please choose 'approve' or 'reject' or 'reupload'");
    }

    const theStudent = await student.findOneAndUpdate({_id: studentID}, {$set: {Isapproved:toApprove, Remarks: remarks}},  { new: true })
    
    if(!theStudent){
        throw new ApiError(400,"faild to approve or reject || student not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, theStudent, `task done successfully`))

})

const approveTeacher = asyncHandler(async(req,res)=>{

    const adminID = req.params.adminID

    if(!adminID){
        throw new ApiError(400, "not authorized")
    }

    const loggedAdmin = await admin.findById(adminID)

    if(!loggedAdmin){
        throw new ApiError(400, "admin not found")
    }


    const teacherID = req.params.teacherID

    if(!teacherID){
        throw new ApiError(400, "student id is required")
    }

    const toApprove = req.body.Isapproved

    const remarks = req.body.remarks || null

    if (!toApprove || (toApprove !== "approved" && toApprove !== "rejected" && toApprove !== "reupload")) {
        throw new ApiError(400, "Please choose 'approve' or 'reject' or 'reupload'");
    }

    const theTeacher = await Teacher.findOneAndUpdate({_id: teacherID}, {$set: {Isapproved:toApprove, Remarks: remarks}},  { new: true })
    
    if(!theTeacher){
        throw new ApiError(400,"faild to approve or reject || student not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, theTeacher, `task done successfully`))

})

const checkStudentDocuments = asyncHandler(async(req,res)=>{
    const adminID = req.params.adminID

    if(!adminID){
        throw new ApiError(400, "not authorized")
    }
    
    const loggedAdmin = await admin.findById(adminID)

    if(!loggedAdmin){
        throw new ApiError(400, "admin not found")
    }
    
    const studentID = req.params.studentID

    if(!studentID){
        throw new ApiError(400, "no student ID")
    }

    const theStudent = await student.findById(studentID)

    if(!theStudent){
        throw new ApiError(400, "student not found")
    }

    const docID = theStudent.Studentdetails

    if(!docID){
        throw new ApiError(400, "Documents not found, please update")
    }

    const studentDocs = await studentdocs.findById(docID)
    
    if(!studentDocs){
        throw new ApiError(400, "failed to retrieve documents")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {loggedAdmin, theStudent, studentDocs}, "documents retrieved successfully"))


})

const checkTeacherDocuments = asyncHandler(async(req,res)=>{
    const adminID = req.params.adminID

    if(!adminID){
        throw new ApiError(400, "not authorized")
    }

    const loggedAdmin = await admin.findById(adminID)

    if(!loggedAdmin){
        throw new ApiError(400, "admin not found")
    }

    const teacherID = req.params.teacherID

    if(!teacherID){
        throw new ApiError(400, "no Teacher ID")
    }

    const theTeacher = await Teacher.findById(teacherID)

    if(!theTeacher){
        throw new ApiError(400, "Teacher not found")
    }

    const docID = theTeacher.Teacherdetails

    if(!docID){
        throw new ApiError(400, "Documents not found, please update")
    }

    const teacherDocs = await Teacherdocs.findById(docID)
    
    if(!teacherDocs){
        throw new ApiError(400, "failed to retrieve documents")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {loggedAdmin, theTeacher, teacherDocs}, "documents retrieved successfully"))


})

export {adminSignUp, adminLogin, forApproval, approveStudent, approveTeacher, checkStudentDocuments, checkTeacherDocuments, adminLogout}