const express = require("express");
const {connection}= require("./config/db")
const {ApiRouter}=require("./Router/api.router")
require("dotenv").config();
const app=express();
app.use(express.json());

app.use("/api",ApiRouter)
app.listen(process.env.port,async ()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log(`Server is running on ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})