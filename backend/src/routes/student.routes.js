import {Router} from "express";
import {signup} from "../controllers/student.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/signup").post(
    signup
)

export default router;