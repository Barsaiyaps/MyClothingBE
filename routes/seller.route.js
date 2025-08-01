require("dotenv").config()
const express = require("express");
const sellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");
const sellerRoute = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../midddleWares/authMiddleWare");
const JWT_TOKEN=process.env.JWT_TOKEN
const HASH_ROUNDS = parseInt(process.env.HASHED_COUNT);

sellerRoute.post("/signup", async (req, res) => {
    try {
        const { sellername, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
        const data = await new sellerModel({ sellername, email, password: hashedPassword });
        await data.save();
        res.send("New User Added Successfully");
    } catch (error) {
        res.send({ msg: "Something went wrong during signup", error });
    }
})

sellerRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const sellerData = await sellerModel.findOne({ email });
        if(sellerData){

            const matchPassword = await bcrypt.compare(password, sellerData.password);
            try {
                if (matchPassword) {
                    const token =await jwt.sign({ sellerData },JWT_TOKEN);
                    // localStorage.setItem("token",token)
                    res.send({ msg: "Login successful", token });
                } else {
                    res.send({ msg: "Incorrect Password" });
                }
            } catch (error) {
                res.send({ msg: "Something went wrong during login", error });
            }
        }else{
            res.send({ msg: "User not found" });
        }
    } catch (error) {
        res.send(error);
    }
});

sellerRoute.get("/dashboard",auth,async(req,res)=>{
    const data=await sellerModel.findById(req.body.seller).populate("products")
    res.send(data.products)
})


sellerRoute.post("/logout",async(req,res)=>{
    req.body.seller=null
    res.send("Logout successful")
})


module.exports = sellerRoute

