const jwt=require("jsonwebtoken")
const TOKEN=process.env.JWT_TOKEN

const userAuth=(req,res,next)=>{
    try {
        const header=req.headers.authorization
        const token=header.split(" ")[1]
        // localStorage.setItem("token",token)    // store in local storage for 
        if(token){
            const decoded=jwt.verify(token,TOKEN)
            const user=decoded.userData
            req.body.user=user._id
            next()
        }else{
            res.send({message:"Please login first"})
        }
    } catch (error) {
        res.send({message:"Something went wrong in auth",error})
    }
}
module.exports=userAuth