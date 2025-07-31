require('dotenv').config()
const jwt=require('jsonwebtoken')
const TOKEN=process.env.JWT_TOKEN
const auth=(req,res,next)=>{
    try {
        const header=req.headers.authorization
        const token=header.split(" ")[1]
        const decoded=jwt.verify(token,TOKEN)
        const user=decoded.userData
        console.log(user)
        if(user.permission=="admin"){
            next()
        }else{
            res.send({message:"You are not authorized"})
        }
    } catch (error) {
        res.send({message:"Something went wrong",error})
    }
}

module.exports=auth