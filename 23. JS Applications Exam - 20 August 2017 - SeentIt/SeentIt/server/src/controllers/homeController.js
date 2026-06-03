import {Router} from "express";

import {parseErrorMessage} from "../util/parseErrorMessage.js";
import posts from "../../import-json/posts.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        for (const post of posts) {
            const user = await User.findOne({username: post.author}).lean();

            const newUser = await Post.create({
                postId: post._id,
                title: post.title,
                description: post.description,
                url: post.url,
                imageUrl: post.imageUrl,
                author: post.author,
                creator: user.userId,
                createdAt: post._kmd.ect,
            })
            console.log(newUser);
        }

        return res.status(200).json({message: "Welcome to the API"});
    } catch (error) {
        return res.status(500).json({messages: parseErrorMessage(error)});
    }
});

export default homeController;