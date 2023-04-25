const jwt=require("jsonwebtoken");
require("dotenv").config();

const authentication=(req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.status(401).send({msg:"Access Denied"})
    }
    jwt.verify(token,process.env.key, async(err,decoed)=>{
        if(err){
            return res.status(401).send({msg:err})
        }else{
            req.body.userId=decoed.userId;
            next()
        }
    })
}
module.exports={
    authentication
}