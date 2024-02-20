import {Router} from "express";
import {signup, mailVerified, login} from "../controllers/student.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

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

export default router;