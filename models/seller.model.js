const mongoose = require("mongoose");

const sellerSchema=new mongoose.Schema({
    sellername:{type: String,required: true},
    email:{type: String,required: true},
    password:{type: String,required: true},
    role:{type: String,enum:["seller","admin"],default:"seller"},
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

sellerSchema.virtual("products",{
    ref:"Product",
    localField:"_id",
    foreignField:"seller"
})

module.exports=mongoose.model("Seller",sellerSchema)