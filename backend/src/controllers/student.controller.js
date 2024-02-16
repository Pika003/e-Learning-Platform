import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {student} from "../models/student.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";



const verifyEmail = async (Email, Firstname, createdStudent_id) => {
    try {
        const emailsender = nodemailer.createTransport({
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
            html: `<p> Hi ${Firstname}, Please click here to <a href="http://localhost:4400/api/student/verify?id=${createdStudent_id}">verify</a> your E-mail. </p>`
        };
        emailsender.sendMail(mailOptions, function(error) {
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


const signup = asyncHandler(async (req, res) =>{
    
    const{Firstname, Lastname, Email, Password} = req.body;

    
    if(
        [Firstname, Lastname, Email, Password].some((field)=> 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    
    const existedStudent = await student.findOne({ Email: req.body.Email });

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
    

    await verifyEmail(Email, Firstname, newStudent._id);

    return res.status(200).json(
        new ApiResponse(200, createdStudent, "Signup successfull")
    )

})

const mailVerified = asyncHandler(async(req,res)=>{
    const id = req.query.id;

        const updatedInfo = await student.updateOne({ _id: id }, { $set: { Isverified: true } });

        if (updatedInfo.nModified === 0) {
            throw new ApiError(404, "Student not found or already verified");
        }
        return res.send("<p>Email successfully verified.</p>");
} )


export{
    signup, mailVerified
}