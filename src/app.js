const express=require("express")
const errorMiddleware=require("./middleware/ErrorMiddleware")
const userRouter=require("./routes/userRouter")
const blogRouter=require("./routes/blogRouter")
const cookieParser = require("cookie-parser");
const cors=require("cors")
const app=express();
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies / credentials
  }));
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogRouter)
app.use(errorMiddleware)

module.exports=app
