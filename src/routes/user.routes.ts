import { Router } from "express"
import { registerUser } from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.route("/register").get(registerUser)

export default userRoutes
