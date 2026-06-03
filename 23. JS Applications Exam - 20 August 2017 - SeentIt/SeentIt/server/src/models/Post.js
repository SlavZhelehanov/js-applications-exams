import {Schema, model} from "mongoose";
import {v4 as uuid} from "uuid";

const postSchema = new Schema({
    postId: {
        type: String,
        // required: [true, "Post ID field can't be empty"],
        default: uuid
    },
    title: {
        type: String,
        required: [true, "Title field can't be empty"],
        minLength: [2, "The Title should be at least 2 characters"]
    },
    // ingredients: {
    //     type: String,
    //     required: [true, "Ingredients field can't be empty"],
    //     minLength: [10, "The ingredients should be at least 10 characters long"],
    //     maxLength: [200, "The ingredients should be max 200 characters long"]
    // },
    // instructions: {
    //     type: String,
    //     required: [true, "Instructions field can't be empty"],
    //     minLength: [10, "The instructions should be at least 10 characters long"]
    // },
    description: {
        type: String,
        required: [true, "Description field can't be empty"],
        minLength: [10, "The description should be at least 10 characters long"],
        // maxLength: [100, "The description should be max 100 characters long"]
    },
    url: {
        type: String,
        required: [true, "URL field can't be empty"],
        match: [/^https?:\/\//, "The URL should start with http:// or https://"]
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL field can't be empty"],
        match: [/^https?:\/\//, "The Image URL should start with http:// or https://"]
    },
    // image: {
    //     type: String,
    //     required: [true, "Instructions field can't be empty"],
    //     match: [/^https?:\/\//, "The Image should start with http:// or https://"]
    // },
    // recommendList: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }],
    // text: {
    //     type: String,
    //     required: [true, "Text field can't be empty"],
    //     minLength: [1, "The text should be at least 1 character long"],
    //     maxLength: [150, "The text shouldn’t contain more than 150 symbols"]
    // },
    author: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        required: [true, "The author field can't be empty"],
    },
    creator: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        required: [true, "The creator field can't be empty"],
    }
}, {timestamps: true});

export default model("Post", postSchema);