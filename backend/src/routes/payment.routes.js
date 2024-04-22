import { Router } from "express";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { coursePayment, coursePaymentConfirmation, getkey } from "../controllers/payment.controller.js";


const router = Router()

router.route("/course/:courseID/:coursename").post(authSTD, coursePayment)

router.route("/razorkey").get(authSTD, getkey)

router.route("/confirmation/course/:courseID").post(authSTD, coursePaymentConfirmation)


export default router;