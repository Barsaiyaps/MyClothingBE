require("dotenv").config()
const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const userAuth = require("../midddleWares/userAuthMiddleWare");
const productModel = require("../models/product.model");
const JWT_TOKEN=process.env.JWT_TOKEN
const HASH_ROUNDS = parseInt(process.env.HASHED_COUNT);

userRoute.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
        const data = await new userModel({ username, email, password: hashedPassword });
        await data.save();
        res.send("New User Added Successfully");
    } catch (error) {
        res.send({ msg: "Something went wrong", error });
    }
})

userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email });
        const matchPassword = await bcrypt.compare(password, userData.password);
        try {
            if (matchPassword) {
                const token =await jwt.sign({ userData },JWT_TOKEN);
                res.send({ msg: "Login successful", token });
            } else {
                res.send({ msg: "Incorrect Password" });
            }
        } catch (error) {
            res.send({ msg: "Something went wrong", error });
        }
    } catch (error) {
        res.send(error);
    }
});

userRoute.post("/add-to-cart/:id",userAuth,async(req,res)=>{
   const user=await userModel.findById(req.body.user)
   const product=await productModel.findById(req.params.id)
   console.log(product)
   await user.cart.push(product)
   await user.save()
   res.send({msg:"Product added to cart",user})

})

userRoute.post("/remove-from-cart/:id",userAuth,async(req,res)=>{
    const user=await userModel.findById(req.body.user)
    const product=await productModel.findById(req.params.id)
    await user.cart.pull(product)
    await user.save()
    res.send({msg:"Product removed from cart",user})
  

})

userRoute.get("/user-cart",userAuth,async(req,res)=>{
    const data=await userModel.findById(req.body.user).populate("cart")
    res.send(data.cart)
})

module.exports = userRoute

