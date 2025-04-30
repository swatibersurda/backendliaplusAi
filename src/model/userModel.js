const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
console.log(process.env.s)
const userSchema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
accessToken:{type:String},
role:{type:String,required:true,default:"user",enum:["user","admin"]}
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10)
    }
    return next()
})

userSchema.methods.validatePassword=async function(password){
    const isMatch=await bcryptjs.compare(password,this.password)
    console.log(isMatch,"at 21 usershema")
    return isMatch
}
userSchema.methods.genrateToken=async function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email,
        phone:this.phone
    },process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES_DAY})
}
const User=mongoose.model("User",userSchema)
module.exports=User
