const express=require("express")
const productRoute=express.Router()
const productModel=require("../models/product.model")
const auth = require("../midddleWares/authMiddleWare")

productRoute.get("/",async(req,res)=>{
    const data=await productModel.find()
    res.send(data)
})

productRoute.post("/add-product",auth,async(req,res)=>{

    try {
        console.log(req.body)
        const data=await new productModel(req.body)
        await data.save()
        res.send("Product added successfully")
    } catch (error) {
        console.log(error)
        res.send({message:"Something went wrong, Product not added",error})    
    }
})

productRoute.delete("/delete/:id",auth,async(req,res)=>{
    const data=await productModel.findByIdAndDelete(req.params.id)
    res.send(data)
})

productRoute.put("/update/:id",auth,async(req,res)=>{
    const data=await productModel.findByIdAndUpdate(req.params.id,req.body)
    res.send(data)
})

productRoute.get("/get/:id",auth,async(req,res)=>{
    const data=await productModel.findById(req.params.id)
    res.send(data)
})


module.exports=productRoute