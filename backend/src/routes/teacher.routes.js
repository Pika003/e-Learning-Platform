import {Router} from "express";
import {signup, mailVerified, login, logout} from "../controllers/teacher.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";

const router = Router()

router.route("/signup").post(
    signup
)

router.route("/verify").get(
    mailVerified
)

router.route("/login").post(
    login
)

router.route("/logout").post(
    authTeacher, logout
)

export default router;