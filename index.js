require("dotenv").config();
const express = require("express");
const app = express();
const PORT=process.env.PORT || 5000;
const connectDb = require("./connectDb");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const sellerRoute = require("./routes/seller.route");
const productRoute = require("./routes/product.route");


app.use(cors());
app.use(express.json());

app.use("/seller",sellerRoute);
app.use("/user",userRoute);
app.use("/product",productRoute)

app.listen(PORT, async() => {
    await connectDb();
    console.log("Server is running on port 5000");
});