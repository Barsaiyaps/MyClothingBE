require('dotenv').config()
const jwt=require('jsonwebtoken')
const TOKEN=process.env.JWT_TOKEN
const auth=(req,res,next)=>{
    try {
        const header=req.headers.authorization
        const token=header.split(" ")[1]
        localStorage.setItem("token",token)    // store in local storage for 
        const decoded=jwt.verify(token,TOKEN)
        const user=decoded.userData
        console.log(user)
        req.body.userId=user._id

        next()
    } catch (error) {
        res.send({message:"Something went wrong",error})
    }
}

module.exports=auth