import express from "express"
import { registration, authenticate, confirmUser, forgetPassword, checkToken, newPassword, profile } from "../controllers/userController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = express.Router()

router.post("/", registration)
router.post("/login", authenticate )
router.get("/confirm/:token", confirmUser)
router.post("/forget-password", forgetPassword)
router.get("/forget-password/:token", checkToken)
router.post("/forget-password/:token", newPassword)
router.get("/profile", checkAuth, profile)

export default router