const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config({path:"./.env"})
console.log(process.env.DB_URL)
const connectDb=async()=>{
     try{

         const connectDb=await mongoose.connect(`${process.env.DB_URL}`)
         console.log(`Connected at${connectDb.connection.host}`)
     }catch(err){
        console.log("Failed to connect")
     }
    
}
module.exports=connectDb