import { Router } from "express";
import { adminLogin, adminSignUp, approveStudent, approveTeacher, checkStudentDocuments, checkTeacherDocuments, forApproval } from "../controllers/admin.controller.js";

const router = Router()

router.route("/signup").post(adminSignUp)

router.route("/login").post(adminLogin)

router.route("/:adminID/approve").post(forApproval)

router.route("/:adminID/approve/student/:studentID").post(approveStudent)

router.route("/:adminID/approve/teacher/:teacherID").post(approveTeacher)

router.route("/:adminID/documents/student/:studentID").get(checkStudentDocuments)

router.route("/:adminID/documents/teacher/:teacherID").get(checkTeacherDocuments)

export default router;

