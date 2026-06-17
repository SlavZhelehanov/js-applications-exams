import {Router} from 'express';
import Post from '../models/Post.js';
import {auth} from "../middlewares/authMiddleware.js";
import Comment from "../models/Comment.js";

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

postsRouter.get('/my', auth, async (req, res) => {
    const {id} = req.user;

    try {
        const props = '-_id -__v -updatedAt'
        const posts = await Post.find({creator: id}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(error);
    }
});

postsRouter.get('/post/:id', auth, async (req, res) => {
    try {
        const props = '-_id -__v -updatedAt'
        const post = await Post.findOne({postId: req.params.id}, props).lean();

        if (!post) return res.status(404).json({message: "Post not found"});
        // if (req.user.id !== post.creator) return res.status(403).json({message: "You are not authorized to view this post"});

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
});

postsRouter.get('/post/:postId/comments', auth, async (req, res) => {
    const {postId} = req.params;

    try {
        const props = '-_id -__v -updatedAt'
        const comments = await Comment.find({postId}, props).lean();
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error);
    }
});

postsRouter.post('/post/:postId/comments', auth, async (req, res) => {
    const {postId} = req.params;
    const content = req.body.comment;

    try {
        const props = '-_id -__v -updatedAt'

        await Comment.create({
            postId,
            content,
            author: req.user.username,
            creator: req.user.id,
        })

        return res.status(200).json("comments");
    } catch (error) {
        return res.status(500).json(error);
    }
});

postsRouter.put('/post/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({postId: req.params.id}).lean();
        const options = req.body;

        if (!post) return res.status(404).json({message: "Post not found"});
        if (req.user.id !== post.creator) return res.status(403).json({message: "You are not authorized to update this post"});

        await Post.findOneAndUpdate({postId: req.params.id}, options, {runValidators: true, returnDocument: 'after'});

        return res.status(200).json({message: "Updated"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

postsRouter.delete('/post/:postId', auth, async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findOne({postId}).lean();

        if (!post) return res.status(404).json({message: "Post not found"});
        if (req.user.id !== post.creator) return res.status(403).json({message: "You are not authorized to delete this post"});

        await Promise.all([Post.findOneAndDelete({postId}), Comment.deleteMany({postId})]);

        return res.status(200).json({message: "Post deleted"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

postsRouter.delete('/post/:postId/:commentId', auth, async (req, res) => {
    try {
        const {postId, commentId} = req.params;
        const post = await Post.findOne({postId}).lean();
        const comment = await Comment.findOne({commentId}).lean();

        if (!post) return res.status(404).json({message: "Post not found"});
        if (!comment) return res.status(404).json({message: "Comment not found"});
        if (req.user.id !== comment.creator) return res.status(403).json({message: "You are not authorized to delete this comment"});

        await Comment.findOneAndDelete({postId, commentId});

        return res.status(200).json({message: "Comment deleted"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default postsRouter;