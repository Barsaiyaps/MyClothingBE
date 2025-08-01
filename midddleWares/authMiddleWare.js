require('dotenv').config()
const jwt=require('jsonwebtoken')
const TOKEN=process.env.JWT_TOKEN
const auth=(req,res,next)=>{
    try {
        const header=req.headers.authorization
        const token=header.split(" ")[1]
        // localStorage.setItem("token",token)    // store in local storage for 
        if(token){
            const decoded=jwt.verify(token,TOKEN)
            const seller=decoded.sellerData
            req.body.seller=seller._id
            next()
        }else{
            res.send({message:"Please login first"})
        }
    } catch (error) {
        res.send({message:"Something went wrong in auth",error})
    }
}

module.exports=auth