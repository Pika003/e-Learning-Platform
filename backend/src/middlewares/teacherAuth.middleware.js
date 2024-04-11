import { ApiError } from "../utils/ApiError.js";
import {Teacher} from "../models/teacher.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const authTeacher = asyncHandler(async(req,_,next)=>{
    const accToken = req.cookies?.Accesstoken

    if(!accToken){
        throw new ApiError(401, "unauthorized req")
    }

    const decodedAccToken = jwt.verify(accToken,
        process.env.ACCESS_TOKEN_SECRET)

    const teacher = await Teacher.findById(decodedAccToken?._id).select("-Password -Refreshtoken")

    if(!teacher){
        throw new ApiError(401, "invalid access token")
    }


    req.teacher = teacher
    next()
})

export {authTeacher}