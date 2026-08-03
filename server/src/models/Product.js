import {Schema, model} from "mongoose";
import {v4 as uuid} from "uuid";

const productSchema = new Schema({
    productId: {
        type: String,
        default: uuid,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [6, 'The title should be at least 6 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'The description should be at least 10 characters long']
    },
    imageURL: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: function(v) {
                return /^https?:\/\//.test(v);
            },
            message: props => `${props.value} is not a valid URL! It should start with http:// or https://`
        }
    },
    creator: {
        type: String,
        required: [true, 'Creator is required']
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String], // Може да се промени на [Schema.Types.ObjectId] с ref, ако имате отделен модел за коментари
        default: []
    }
}, {timestamps: true});

export default model("Product", productSchema);