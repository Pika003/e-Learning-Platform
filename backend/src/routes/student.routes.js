import {Router} from "express";
import {signup, mailVerified} from "../controllers/student.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/signup").post(
    signup
)

router.route("/verify").get(
    mailVerified
)

export default router;