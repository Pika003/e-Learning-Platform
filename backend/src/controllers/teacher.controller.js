import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher, Teacherdocs } from "../models/teacher.model.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const verifyEmail = async (Email, Firstname, createdTeacherId) => {
    try {
        const emailSender = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            }
        });
        const mailOptions = {
            from: "elearningsnu@gmail.com",
            to: Email,
            subject: "Verify your E-mail",
            html: `<div style="text-align: center;">
            <p style="margin: 20px;"> Hi ${Firstname}, Please click the button below to verify your E-mail. </p>
            <img src="https://img.freepik.com/free-vector/illustration-e-mail-protection-concept-e-mail-envelope-with-file-document-attach-file-system-security-approved_1150-41788.jpg?size=626&ext=jpg&uid=R140292450&ga=GA1.1.553867909.1706200225&semt=ais" alt="Verification Image" style="width: 100%; height: auto;">
            <br>
            <a href="http://localhost:4400/api/student/verify?id=${createdTeacherId}">
                <button style="background-color: black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 10px 0; cursor: pointer;">Verify Email</button>
            </a>
        </div>`
        };
        emailSender.sendMail(mailOptions, function(error) {
            if (error) {
                throw new ApiError(400, "Sending email verification failed");
            } else {
                console.log("Verification mail sent successfully");
            }
        });
    } catch (error) {
        throw new ApiError(400, "Failed to send email verification");
    }
};

const generateAccessAndRefreshTokens = async (teacherId) => { 
    try {
        const teacher = await Teacher.findById(teacherId);
        const Accesstoken = teacher.generateAccessToken();
        const Refreshtoken = teacher.generateRefreshToken();

        teacher.Refreshtoken = Refreshtoken;
        await teacher.save({ validateBeforeSave: false });

        return { Accesstoken, Refreshtoken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const signup = asyncHandler(async (req, res) => {
    const { Firstname, Lastname, Email, Password } = req.body;

    if ([Firstname, Lastname, Email, Password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedTeacher = await Teacher.findOne({ Email });

    if (existedTeacher) {
        throw new ApiError(400, "Teacher already exists");
    }

    const newTeacher = await Teacher.create({
        Email,
        Firstname,
        Lastname,
        Password,
    });

    const createdTeacher = await Teacher.findById(newTeacher._id).select("-Password");

    if (!createdTeacher) {
        throw new ApiError(501, "Teacher registration failed");
    }

    await verifyEmail(Email, Firstname, newTeacher._id);

    return res.status(200).json(
        new ApiResponse(200, createdTeacher, "Signup successful")
    );
});

const mailVerified = asyncHandler(async (req, res) => {
    try {
        const id = req.query.id;
    
        const updatedInfo = await Teacher.updateOne({ _id: id }, { $set: { Isverified: true } });
    
        if (updatedInfo.nModified === 0) {
            throw new ApiError(404, "Teacher not found or already verified");
        }
    
        return res.send(`
        <div style="text-align: center; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png" alt="Verify Email Icon" style="width: 100px; height: 100px;">
            <h1 style="font-size: 36px; font-weight: bold; padding: 20px;">Email Verified</h1>
            <h4>Your email address was successfully verified.</h4>
            <button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; margin: 20px;" onclick="window.location.href = 'http://localhost:5173';">Go Back Home</button>
        </div>`
        );
    } catch (error) {
        throw new ApiError(509, "something went wrong while verifying User")
    }
});

const login = asyncHandler(async (req, res) => {

    const Email = req.user.Email
    const Password = req.user.Password

    if (!Email) {
        throw new ApiError(400, "E-mail is required");
    }
    if (!Password) {
        throw new ApiError(400, "Password is required");
    }

    const teacher = await Teacher.findOne({ Email });

    if (!teacher) {
        throw new ApiError(403, "Teacher does not exist");
    }

    if (!teacher.Isverified) {
        throw new ApiError(401, "Email is not verified");
    }
    
    const isPasswordCorrect = await teacher.isPasswordCorrect(Password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    const { Accesstoken, Refreshtoken } = await generateAccessAndRefreshTokens(teacher._id);

    const loggedInTeacher = await Teacher.findById(teacher._id).select("-Password -Refreshtoken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("Accesstoken", Accesstoken, options)
        .cookie("Refreshtoken", Refreshtoken, options)
        .json(new ApiResponse(200, { user: loggedInTeacher }, "Logged in"));
});

const logout = asyncHandler(async(req, res)=>{
    await Teacher.findByIdAndUpdate(req.teacher?._id,
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken",  options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const inTeacher = asyncHandler(async(req,res) =>{
    const user = req.teacher

    const id = req.params.id
    if(req.teacher._id != id){
        throw new ApiError(400, "unauthroized access")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user, "done"))
})

const addTeacherDetails = asyncHandler(async(req,res)=>{

    const id = req.params.id
    if(req.teacher._id != id){
        throw new ApiError(400, "unauthroized access")
    }

    const{Phone, Address, Experience, SecondarySchool, HigherSchool,UGcollege, PGcollege, SecondaryMarks, HigherMarks, UGmarks, PGmarks} = req.body

    if([Phone, Address, Experience, SecondarySchool, HigherSchool,UGcollege, PGcollege, SecondaryMarks, HigherMarks, UGmarks, PGmarks].some((field)=> field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const alreadyExist = await Teacherdocs.findOne({Phone})

    if(alreadyExist){
        throw new ApiError(400, "Phone number already exist")
    }

    const AadhaarLocalPath = req.files?.Aadhaar?.[0]?.path;

    const SecondaryLocalPath = req.files?.Secondary?.[0]?.path;

    const HigherLocalPath = req.files?.Higher?.[0]?.path

    const UGLocalPath = req.files?.UG?.[0]?.path

    const PGLocalPath = req.files?.PG?.[0]?.path


    if(!AadhaarLocalPath){
        throw new ApiError(400, "Aadhaar is required")
    }
    if(!SecondaryLocalPath){
        throw new ApiError(400, "Secondary marksheet is required")
    }
    if(!HigherLocalPath){
        throw new ApiError(400, "Higher marksheet is required")
    }
    if(!UGLocalPath){
        throw new ApiError(400, "UG marksheet is required")
    }
    if(!PGLocalPath){
        throw new ApiError(400, "PG marksheet is required")
    }


    const Aadhaar = await uploadOnCloudinary(AadhaarLocalPath)
    console.log(Aadhaar)
    const Secondary = await uploadOnCloudinary(SecondaryLocalPath)
    const Higher = await uploadOnCloudinary(HigherLocalPath)
    const UG = await uploadOnCloudinary(UGLocalPath)
    const PG = await uploadOnCloudinary(PGLocalPath)

    const teacherdetails = await Teacherdocs.create({
        Phone,
        Address,
        Experience,
        SecondarySchool,
        HigherSchool,
        UGcollege,
        PGcollege,
        SecondaryMarks,
        HigherMarks,
        UGmarks,
        PGmarks,
        Aadhaar: Aadhaar.url,
        Secondary: Secondary.url,
        Higher: Higher.url,
        UG:UG.url,
        PG:PG.url,
    })

    const loggedTeacher = await Teacher.findByIdAndUpdate(id, {Teacherdetails: teacherdetails._id}).select("-Password -Refreshtoken")

    return res
    .status(200)
    .json(new ApiResponse(200, loggedTeacher, "documents uploaded successfully"))

})

export { signup, mailVerified, login, logout, addTeacherDetails, inTeacher };
