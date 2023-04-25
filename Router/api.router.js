const express=require("express");
const {UserModel}=require("../Model/user.model")
const {FlightModel}=require("../Model/flight.model")
const {BookModel}=require("../Model/book.model");
const {authentication}=require("../Middleware/authentication")
const ApiRouter=express.Router()
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const e = require("express");
require("dotenv").config();
ApiRouter.post("/register",async(req,res)=>{
  const { name,email,password}=req.body;
    try {
        if(!name||!email||!password){
          return  res.status(401).send("Fill All Details")
        }
        const user= await UserModel.find({email});
        if(user.length>0){
            return res.status(401).send("User is already Registerd")
        }
        bcrypt.hash(password,+process.env.saltRounds,async(err,has_pass)=>{
            if(err){
                res.status(400).send({msg:err})
            }else{
                const newUser= new UserModel({
                    name,
                    email,
                    password:has_pass
                })
                await newUser.save();
                res.status(201).send({msg:"User Succesfully Register"})
            }
        })
   
        
    } catch (error) {
        res.status(404).send({msg:error})
    }
})
ApiRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email||!password){
            res.status(400).send("Provied All Details")
        }
        const user=await UserModel.findOne({email});
        if(!user){
          return  res.status(400).send("User Not Found")
        }
        const hash= user.password;
        const userId=user._id;
        bcrypt.compare(password,hash,async(err,result)=>{
            if(err){
                return res.status(400).send({mss:err})
            }else{
                let token= jwt.sign({id:userId},process.env.key);
                res.status(201).send({msg:"User Login",token})
            }
        })


    } catch (error) {
        res.status(404).send({msg:error})
    }
})
// 2023-04-25T07:41:42.023Z
ApiRouter.get("/flights",async(req,res)=>{
try {
    let todayDate= new Date();
    let avilableFlights= await FlightModel.find({departureTime:{$gt:todayDate}});
    res.status(200).send(avilableFlights)
} catch (error) {
    res.status(404).send({msg:error})
    
}
})
ApiRouter.get("/flights/:id",async(req,res)=>{
try {
    let id=req.params.id;
    let Flights= await FlightModel.find({_id:id});
    res.status(200).send(Flights)
} catch (error) {
    res.status(404).send({msg:error})
    
}
})
ApiRouter.patch("/flights/:id",async(req,res)=>{
try {
    let id=req.params.id;
    let payload=req.body;
    await FlightModel.findByIdAndUpdate({_id:id},payload);
    res.status(204).send("Flight Updated")
} catch (error) {
    res.status(404).send({msg:error})
    
}
})
ApiRouter.delete("/flights/:id",async(req,res)=>{
try {
    let id=req.params.id;
     await FlightModel.findByIdAndDelete({_id:id});
    res.status(202).send("Flight Deleted")
} catch (error) {
    res.status(404).send({msg:error})
    
}
})
ApiRouter.post("/flights",async(req,res)=>{
    const {airline,
    flightNo ,
    departure ,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    price
    }= req.body;
    try {
        if(!airline || !flightNo|| !departure || !arrival || !departureTime || !arrivalTime || !seats || !price){
            return res.status(400).send("Please Provied All Details")
        }
        const flight= new FlightModel({
                                        airline,
                                        flightNo ,
                                        departure ,
                                        arrival,
                                        departureTime,
                                        arrivalTime,
                                        seats,
                                        price
        })
        await flight.save();
       return res.status(201).send("Flight Added Successfully");
    } catch (error) {
        res.status(404).send({msg:error})
        
    }
})
ApiRouter.post("/booking",authentication, async (req,res)=>{
    const flight= req.body.flight;
    const user=req.body.userId;
    let todayDate= new Date();
    try {
      
        const checkFlightAvilibality= await FlightModel.find({_id:flight,departureTime:{$gt:todayDate},seats:{$gt:0}});
        if(checkFlightAvilibality.length==0){
            return res.status(400).send("Flight Not Fond or Booking Time Over or Flight Seats is Not Avilable")
        }else{
            const book= new BookModel({
                user,
                flight
            })
            await book.save()
            await FlightModel.findByIdAndUpdate({_id:flight},{seats:checkFlightAvilibality[0].seats-1});
            return res.status(201).send({msg:"User Booked Flight"})
        }
    } catch (error) {
        res.status(400).send({msg:error})
    }
})

module.exports={
    ApiRouter
}