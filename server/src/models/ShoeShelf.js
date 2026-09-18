import {Schema, model} from "mongoose";
import {v4 as uuid} from "uuid";

const shoeShelfSchema = new Schema({
    shoeShelfId: {
        type: String,
        default: uuid,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'The name should be at least 2 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'The description should be at least 10 characters long']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: function(v) {
                return /^https?:\/\//.test(v);
            },
            message: props => `${props.value} is not a valid URL! It should start with http:// or https://`
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price should be at least 0']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        minlength: [2, 'The brand should be at least 2 characters long']
    },
    creator: {
        type: String,
        required: [true, 'Creator is required']
    },
    peopleBoughtIt: {
        type: [String], // Може да се промени на [Schema.Types.ObjectId] с ref, ако имате отделен модел за коментари
        default: []
    }
}, {timestamps: true});

export default model("ShoeShelf", shoeShelfSchema);