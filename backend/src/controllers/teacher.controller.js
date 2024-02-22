import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.model.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

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
            html: `<p> Hi ${Firstname}, Please click here to <a href="http://localhost:4400/api/teacher/verify?id=${createdTeacherId}">verify</a> your E-mail. </p>`
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
        const accessToken = teacher.generateAccessToken();
        const refreshToken = teacher.generateRefreshToken();

        teacher.refreshToken = refreshToken;
        await teacher.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
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
    
        return res.send("<p>Email successfully verified.</p>");
    } catch (error) {
        throw new ApiError(509, "something went wrong while verifying User")
    }
});

const login = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email) {
        throw new ApiError(400, "E-mail is required");
    }
    if (!Password) {
        throw new ApiError(400, "Password is required");
    }

    const teacher = await Teacher.findOne({ Email });

    if (!teacher) {
        throw new ApiError(400, "Teacher does not exist");
    }

    if (!teacher.Isverified) {
        throw new ApiError(401, "Email is not verified");
    }
    
    const isPasswordCorrect = await teacher.isPasswordCorrect(Password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(teacher._id);

    const loggedInTeacher = await Teacher.findById(teacher._id).select("-Password -RefreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
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
export { signup, mailVerified, login, logout };
