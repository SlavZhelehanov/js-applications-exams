import {Router} from 'express';
import {isValidObjectId} from 'mongoose';
import {isAuth} from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import Chirp from "../models/Chirp.js";

const chirpsRouter = Router();

chirpsRouter.get('/', isAuth, async (req, res) => {
    try {
        const {following} = await User.findOne({userId: req.user.id}, 'following').lean();
        const feed = await Chirp.find({author: {$in: following}}).sort({createdAt: -1});
        return res.status(200).json(feed);
    } catch (error) {
        return res.status(500).json(error);
    }
});

chirpsRouter.post('/', isAuth, async (req, res) => {
    try {
        const {text} = req.body;

        await Chirp.create({text, author: req.user.username, creator: req.user.id});
        return res.status(200).json({message: 'Chirp created'})
    } catch (error) {
        return res.status(500).json(error);
    }
});

chirpsRouter.get('/me', isAuth, async (req, res) => {
    try {
        const chirps = await Chirp.find({creator: req.user.id}, 'author text createdAt');
        const userData = await User.findOne({userId: req.user.id}, '-_id chirps following followers').lean();
        return res.status(200).json({chirps, userData});
    } catch (error) {
        return res.status(500).json(error);
    }
});

chirpsRouter.delete('/:id', isAuth, async (req, res) => {
    try {
        const {id} = req.params;

        if (!isValidObjectId(id)) return res.status(400).json({message: 'Invalid ID'});

        const chirp = await Chirp.findOneAndDelete({_id: id, creator: req.user.id});

        if (!chirp) return res.status(404).json({message: 'Chirp not found'});

        return res.status(200).json({message: 'Chirp deleted'});
    } catch (error) {
        return res.status(500).json(error);
    }
});

chirpsRouter.get('/:id/users-chirps', isAuth, async (req, res) => {
    const {id} = req.params;

    // if (!isValidObjectId(id)) return res.status(400).json({message: 'Wrong ID'});

    try {
        const chirps = await Chirp.find({creator: id}, '-_id text author createdAt');
        return res.status(200).json(chirps);
    } catch (error) {
        return res.status(500).json(error);
    }
})

export default chirpsRouter;