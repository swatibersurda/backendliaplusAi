const express=require("express")
const errorMiddleware=require("./middleware/ErrorMiddleware")
const userRouter=require("./routes/userRouter")
const blogRouter=require("./routes/blogRouter")
const cookieParser = require("cookie-parser");

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogRouter)
app.use(errorMiddleware)

module.exports=app
