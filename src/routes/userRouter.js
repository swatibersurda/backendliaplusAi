const express=require("express")
const {register,login,logout}=require("../controllers/userController")
const authMiddleware=require("../middleware/AuthMiddleware")
const userRouter=express.Router()

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(authMiddleware,logout)

module.exports=userRouter