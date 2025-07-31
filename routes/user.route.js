require("dotenv").config()
const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
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





module.exports = userRoute

