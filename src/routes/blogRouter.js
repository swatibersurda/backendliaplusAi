const express=require("express")
const {addBlog,deleteBlog,getAllBlog,updateBlog}=require("../controllers/blogController")
const adminMiddleware=require("../middleware/adminMiddleware")
const blogRouter=express.Router()

blogRouter.route("/addPost").post(adminMiddleware,addBlog)
blogRouter.route("/deletePost/:id").delete(adminMiddleware,deleteBlog)
blogRouter.route("/updatePost/:id").patch(adminMiddleware,updateBlog)
blogRouter.route("/getPost").get(getAllBlog)

module.exports=blogRouter