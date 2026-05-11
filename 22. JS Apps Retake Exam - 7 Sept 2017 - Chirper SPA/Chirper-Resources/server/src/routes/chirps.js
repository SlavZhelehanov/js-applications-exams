import {Router} from 'express';
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

export default chirpsRouter;