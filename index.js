require("dotenv").config();
const express = require("express");
const app = express();
const PORT=process.env.PORT || 5000;
const connectDb = require("./connectDb");
const cors = require("cors");
const userRoute = require("./routes/user.route");


app.use(cors());
app.use(express.json());

app.use("/user",userRoute);

app.listen(PORT, async() => {
    await connectDb();
    console.log("Server is running on port 5000");
});