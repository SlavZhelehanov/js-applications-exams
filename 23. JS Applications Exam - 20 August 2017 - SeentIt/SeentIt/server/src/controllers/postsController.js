import {Router} from 'express';
import Post from '../models/Post.js';
import {auth} from "../middlewares/authMiddleware.js";

const postsRouter = Router();
postsRouter.post('/', auth, async (req, res) => {
    const {title, description, url, imageUrl} = req.body;
    const {id, username} = req.user;

    try {
        const post = await Post.create({title, description, url, imageUrl, author: username, creator: id});

        if (!post) return res.status(400).json({message: "Post not created"});

        return res.status(200).json({message: "Created"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default postsRouter;