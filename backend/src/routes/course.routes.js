import { Router } from "express";
import { addCourseStudent, addCourseTeacher, getCourse, getcourseTeacher } from "../controllers/course.controller.js";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";


const router = Router()


router.route("/all").get(getCourse)

router.route("/:coursename").get(getcourseTeacher)

router.route("/:coursename/create/:id").post(authTeacher, addCourseTeacher)

router.route("/:coursename/:courseID/add/student/:id").post(authSTD, addCourseStudent)

export default router;