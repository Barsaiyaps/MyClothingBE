const mongoose=require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        // brand: {
        //     type: String,
        //     default: "Generic",
        // },
        // category: {
        //     type: String,
        //     required: [true, "Category is required"],
        // },
        // sizes: {
        //     type: [String], // e.g., ["S", "M", "L", "XL"]
        //     default: [],
        // },
        // colors: {
        //     type: [String], // e.g., ["Black", "Red"]
        //     default: [],
        // },
        // imageUrls: {
        //     type: [String],
        //     required: true,
        // },
        // stock: {
        //     type: Number,
        //     required: true,
        //     min: 0,
        // },
        // isFeatured: {
        //     type: Boolean,
        //     default: false,
        // },
        // rating: {
        //     type: Number,
        //     default: 0,
        //     min: 0,
        //     max: 5,
        // },
        // numReviews: {
        //     type: Number,
        //     default: 0,
        // },
        // discount: {
        //     type: Number,
        //     default: 0, // % off
        // },
        // gender: {
        //     type: String,
        //     enum: ["Men", "Women", "Unisex"],
        //     default: "Unisex",
        // },
        // material: {
        //     type: String,
        // },
        // tags: {
        //     type: [String],
        //     default: [],
        // },
        // sku: {
        //     type: String,
        //     unique: true,
        // },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller", // Assuming you're linking to a user model
        },
    }
);

const productModel = mongoose.model("Product", productSchema)

module.exports = productModel;
