const express=require("express")
const connectDb=require("./db/connectDb")
const app=require("./app")
connectDb().then(()=>{
app.listen(process.env.PORT||8000,()=>{
console.log("Connected successfully")
})
}).catch((err)=>{
    console.log("Error while connecting")
})