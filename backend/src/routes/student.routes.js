import {Router} from "express";
import {signup, mailVerified, login,logout} from "../controllers/student.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {authSTD} from "../middlewares/stdAuth.middleware.js"

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

router.route("/logout").post(authSTD, logout)

export default router;