import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {student, studentdocs} from "../models/student.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Teacher } from "../models/teacher.model.js";
import { Sendmail } from "../utils/Nodemailer.js";



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
        // const mailOptions = {
        //     from: "elearningsnu@gmail.com",
        //     to: Email,
        //     subject: "Verify your E-mail",
        //     html: `<p> Hi ${Firstname}, Please click here to <a href="http://localhost:4400/api/student/verify?id=${createdStudent_id}">verify</a> your E-mail. </p>`
        // };

        const mailOptions = {
            from: "elearningsnu@gmail.com",
            to: Email,
            subject: "Verify your E-mail",
            html: `
            <div style="text-align: center;">
                <p style="margin: 20px;"> Hi ${Firstname}, Please click the button below to verify your E-mail. </p>
                <img src="https://img.freepik.com/free-vector/illustration-e-mail-protection-concept-e-mail-envelope-with-file-document-attach-file-system-security-approved_1150-41788.jpg?size=626&ext=jpg&uid=R140292450&ga=GA1.1.553867909.1706200225&semt=ais" alt="Verification Image" style="width: 100%; height: auto;">
                <br>
                <a href="http://localhost:4400/api/student/verify?id=${createdStudent_id}">
                    <button style="background-color: black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 10px 0; cursor: pointer;">Verify Email</button>
                </a>
            </div>`
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

const generateAccessAndRefreshTokens = async (stdID) =>{ 
    try {
        
        const std = await student.findById(stdID)
        
        const Accesstoken = std.generateAccessToken()
        const Refreshtoken = std.generateRefreshToken()

        std.Refreshtoken = Refreshtoken
        await std.save({validateBeforeSave:false})

        return{Accesstoken, Refreshtoken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


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


    const cheakTeach=await Teacher.findOne({Email:req.body.Email});

    if(cheakTeach){
        throw new ApiError(400, "Email Belong to Teacher");
    }

    

    
    const newStudent = await student.create({
        Email,
        Firstname,
        Lastname,
        Password,
        Studentdetails:null,

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
        return res.send(`
        <div style="text-align: center; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png" alt="Verify Email Icon" style="width: 100px; height: 100px;">
            <h1 style="font-size: 36px; font-weight: bold; padding: 20px;">Email Verified</h1>
            <h4>Your email address was successfully verified.</h4>
            <button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; margin: 20px;" onclick="window.location.href = 'http://localhost:5173';">Go Back Home</button>
        </div>
        `);
} )


const login = asyncHandler(async(req,res) => {

    const Email = req.user.Email
    const Password = req.user.Password


    if([Email, Password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const StdLogin = await student.findOne({
        Email
    })

    if(!StdLogin){
        throw new ApiError(400, "Student does not exist")
    }

    if(!StdLogin.Isverified){
        throw new ApiError(401, "Email is not verified");
    }

    const StdPassCheck = await StdLogin.isPasswordCorrect(Password)

    if(!StdPassCheck){
        throw new ApiError(403,"Password is incorrect",)
    }

    const tempStd = StdLogin._id

    
    const {Accesstoken, Refreshtoken} =  await generateAccessAndRefreshTokens(tempStd)

    const loggedInStd = await student.findById(tempStd).select("-Password -Refreshtoken")

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .cookie("Refreshtoken", Refreshtoken, options)
    .json(
        new ApiResponse(
            200,{
            user:loggedInStd
            }, "logged in"
            )
    )

})

const logout = asyncHandler(async(req,res)=>{
    await student.findByIdAndUpdate(
        req.Student._id,
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
    .json(new ApiResponse(200, {}, "User logged out"))
})

const getStudent = asyncHandler(async(req,res)=>{
    const user = req.Student
    const id = req.params.id
    if(req.Student._id != id){
        throw new ApiError(400, "unauthroized access")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, user, "Student is logged in"))
})
const addStudentDetails = asyncHandler(async(req, res)=>{

    const id = req.params.id
    if(req.Student._id != id){
        throw new ApiError(400,"not authorized ")
    }

    const {Phone, Address, Highesteducation, SecondarySchool, HigherSchool, SecondaryMarks, HigherMarks}  = req.body

    if ([Phone, Address, Highesteducation, SecondarySchool, HigherSchool, SecondaryMarks, HigherMarks].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const alreadyExist = await studentdocs.findOne({Phone})

    if(alreadyExist){
        throw new ApiError(400, "phone number already exists")
    }

    const AadhaarLocalPath = req.files?.Aadhaar?.[0]?.path;

    const SecondaryLocalPath = req.files?.Secondary?.[0]?.path;

    const HigherLocalPath = req.files?.Higher?.[0]?.path

    if(!AadhaarLocalPath){
        throw new ApiError(400, "Aadhaar is required")
    }

    if(!SecondaryLocalPath){
        throw new ApiError(400, "Secondary marksheet is required")
    }

    if(!HigherLocalPath){
        throw new ApiError(400, "Higher marksheet is required")
    }

    const Aadhaar = await uploadOnCloudinary(AadhaarLocalPath)
    const Secondary = await uploadOnCloudinary(SecondaryLocalPath)

    const Higher = await uploadOnCloudinary(HigherLocalPath)

    const studentdetails = await studentdocs.create({
        Phone,
        Address,
        Highesteducation,
        SecondarySchool,
        HigherSchool,
        SecondaryMarks,
        HigherMarks,
        Aadhaar: Aadhaar.url,
        Secondary: Secondary.url,
        Higher: Higher.url,
    })


    //const loggedstd = await student.findByIdAndUpdate(id, {})

    const theStudent = await student.findOneAndUpdate({_id: id}, {$set: {Isapproved:"pending", Studentdetails: studentdetails._id}},  { new: true }).select("-Password -Refreshtoken")
    
    
    if(!theStudent){
        throw new ApiError(400,"faild to approve or reject || student not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, theStudent, "documents uploaded successfully"))

})




const forgetPassword=asyncHandler(async(req,res)=>{

   const { Email } =  req.body

   if(!Email){
    throw new ApiError(400, "Email is required")
    }
   
    const User=await student.findOne({Email});

    if(!User){
       throw new ApiError(404,"email not found!!");
    }

   await User.generateResetToken();

   await User.save();

   const resetToken=`${process.env.FRONTEND_URL}/student/forgetpassword/${User.forgetPasswordToken}`
  
   const subject='RESET PASSWORD'

   const message=` <p>Dear ${User.Firstname}${User.Lastname},</p>
   <p>We have received a request to reset your password. To proceed, please click on the following link: <a href="${resetToken}" target="_blank">reset your password</a>.</p>
   <p>If the link does not work for any reason, you can copy and paste the following URL into your browser's address bar:</p>
   <p>${resetToken}</p>
   <p>Thank you for being a valued member of the Shiksharthee community. If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
   <p>Best regards,</p>
   <p>The Shiksharthee Team</p>`

   try{
    
    await Sendmail(Email,subject,message);

    res.status(200).json({

        success:true,
        message:`Reset password Email has been sent to ${Email} the email SuccessFully`
     })

    }catch(error){

        throw new ApiError(404,"operation failed!!");
    }


})



const  resetPassword= asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password,confirmPassword} = req.body;

    if(password != confirmPassword){
        throw new ApiError(400,"password does not match")
    }
        

    try {
        const user = await student.findOne({
            forgetPasswordToken:token,
            forgetPasswordExpiry: { $gt: Date.now() }
        });
         console.log("flag2",user);

        if (!user) {
            throw new ApiError(400, 'Token is invalid or expired. Please try again.');
        }

   

        user.Password = password; 
        user.forgetPasswordExpiry = undefined;
        user.forgetPasswordToken = undefined;

        await user.save(); 

        res.status(200).json({
            success: true,
            message: 'Password changed successfully!'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        throw new ApiError(500, 'Internal server error!!!');
    }
});



export{
    signup,
     mailVerified,
      login, 
      logout, 
      addStudentDetails,
       getStudent, 
       forgetPassword,
       resetPassword
}
