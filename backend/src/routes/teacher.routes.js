import {Router} from "express";
import {signup, mailVerified, login, logout, addTeacherDetails, getTeacher, teacherdocuments} from "../controllers/teacher.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";
import { authSchema } from "../middlewares/joiLogin.middleware.js";
import { forgetPassword, resetPassword } from "../controllers/student.controller.js";

const router = Router()

router.route("/signup").post(
    signup
)

router.route("/verify").get(
    mailVerified
)

router.route("/login").post(
    authSchema, login
)

router.route("/logout").post(
    authTeacher, logout
)

router.route("/verification/:id").post(authTeacher,
    upload.fields([
        {
            name:"Aadhaar",
            maxCount:1,
        },
        {
            name:"Secondary",
            maxCount:1,
        },
        {
            name:"Higher",
            maxCount:1
        },
        {
            name:"UG",
            maxCount:1
        },
        {
            name:"PG",
            maxCount:1
        }
    ]) ,
     addTeacherDetails)

router.route("/teacherdocument/:id").get(authTeacher, getTeacher)

router.route("/teacherdocuments").post(teacherdocuments)


router.route('/forgetpassword').post(forgetPassword)

router.route('/forgetpassword/:token').post(resetPassword)

export default router;
