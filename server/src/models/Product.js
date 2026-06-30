import {Schema, model} from "mongoose";
import {v4 as uuid} from "uuid";

const productSchema = new Schema({
    productId: {
        type: String,
        default: uuid,
    },
    productName: {
        type: String,
        required: [true, "Product name field can't be empty"],
    },
    description: {
        type: String,
        required: [true, "Description field can't be empty"],
        minLength: [1, "The description should be at least 10 characters long"],
        // maxLength: [100, "The description should be max 100 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Price field can't be empty"],
        min: [0, "The price should be at least 0"],
    },
    creator: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        required: [true, "The creator field can't be empty"],
    }
}, {timestamps: true});

export default model("Product", productSchema);