const Blog=require("../model/blogModel");
const ApiResponse = require("../utils/ApiResponse");
const ErrorHandler=require("../utils/ErrorHandler")
const addBlog = async (req, res, next) => {
    // console.log("reaching here")
    try{

        const blog=await Blog.create(req.body)
        return res.status(201).json(new ApiResponse("Created Blog",blog,201))

    }catch(err){
        // console.log(err)
        return next(new ErrorHandler("Internal Sdderver Error",500))
    }
};
const updateBlog=async(req,res,next)=>{
    const id=req.params.id
    try{

        const blog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(201).json(new ApiResponse("Created Blog",blog,201))

    }catch(err){
        return next(new ErrorHandler("Internal Server Error",500))
    }
}
const deleteBlog=async(req,res,next)=>{ 
    const id=req.params.id
    try{

        const blog=await Blog.findByIdAndDelete(id)
        return res.status(200).json(new ApiResponse("deleted Blog",blog,200))

    }catch(err){
        return next(new ErrorHandler("Internal Server Error",500))
    }
}
const getAllBlog=async(req,res,next)=>{
    console.log("reaching here...")
    try{

        const blog=await Blog.find().lean().exec()
        return res.status(200).json(new ApiResponse("geted all Blog",blog,200))

    }catch(err){
        return next(new ErrorHandler("Internal Server Error",500))
    }

}
module.exports={addBlog,deleteBlog,getAllBlog,updateBlog}