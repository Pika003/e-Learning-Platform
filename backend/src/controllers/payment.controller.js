import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {instance}  from "../app.js"
import crypto from "crypto"
import {payment} from "../models/payment.model.js"

const coursePayment = asyncHandler(async(req,res)=>{
    const {fees, } = req.body

    if(!fees){
      throw new ApiError(400,"fees is required")
    }

    const options = {
        amount: fees,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      const order = await instance.orders.create(options)

      return res
      .status(200)
      .json( new ApiResponse(200, order,"order fetched"))
})


const getkey = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(new ApiResponse(200,{key:process.env.KEY_ID}, "razor key fetched"))
})


const coursePaymentConfirmation = asyncHandler(async(req,res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  
  const studentID = req.Student._id
  const courseID = req.params

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {

    const orderDetails = await payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseID, 
      studentID,
    });

    return res
    .status(200)
    .json(new ApiResponse(200,{orderDetails}, "payment confirmed" ))
  } else {
    throw new ApiError(400, "payment failed")
  }
})

export {coursePayment, getkey, coursePaymentConfirmation}