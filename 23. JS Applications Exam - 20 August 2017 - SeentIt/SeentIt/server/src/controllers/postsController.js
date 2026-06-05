import {Router} from 'express';
import Post from '../models/Post.js';
import {auth} from "../middlewares/authMiddleware.js";

const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
    try {
        const props = '-_id -__v -updatedAt'
        const posts = await Post.find({}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(error);
    }
});

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

postsRouter.get('/post/:id', auth, async (req, res) => {
    try {
        const props = '-_id -__v -updatedAt'
        const post = await Post.findOne({postId: req.params.id}, props).lean();

        if (!post) return res.status(404).json({message: "Post not found"});
        if (req.user.id !== post.creator) return res.status(403).json({message: "You are not authorized to view this post"});

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default postsRouter;