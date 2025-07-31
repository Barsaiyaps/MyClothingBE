require("dotenv").config()
const express = require("express");
const userModel = require("../models/user.model");
const userRoute = express.Router();
const bcrypt = require("bcrypt");

userRoute.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, process.env.HASHED_COUNT);
        const data = new userModel({ username, email, password: hashedPassword });
        await data.save();
        await res.send("New User Added Successfully");
    } catch (error) {
        res.send({ msg: "Something went wrong", error });
    }
})

userRoute.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email });
        const matchPassword = await bcrypt.compare(password, userData.password);
        try {
            if (matchPassword) {
                const token = jwt.sign({ userData },process.env.JWT_TOKEN);
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

