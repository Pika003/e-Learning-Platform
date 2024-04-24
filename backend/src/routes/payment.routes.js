import { Router } from "express";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { coursePayment, coursePaymentConfirmation, getkey, teacherAmount, withdrawAmount } from "../controllers/payment.controller.js";
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";


const router = Router()

router.route("/course/:courseID/:coursename").post(authSTD, coursePayment)

router.route("/razorkey").get(authSTD, getkey)

router.route("/confirmation/course/:courseID").post(authSTD, coursePaymentConfirmation)

router.route("/teacher/:teacherID/balance").post(authTeacher, teacherAmount)

router.route("/teacher/:teacherID/withdraw").post(authTeacher, withdrawAmount)




export default router;