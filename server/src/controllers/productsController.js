import {Router} from 'express';
import {isAuth} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import Dish from "../models/Dish.js";
import User from "../models/User.js";
import SoftWikiArticle from "../models/SoftWikiArticle.js";

const articlesRouter = Router();
const props = '-_id -__v -updatedAt';

articlesRouter.get("/", isAuth, async (req, res) => {
    try {
        const articles = await SoftWikiArticle.find({}, props).sort({likes: -1, createdAt: -1}).lean();
        return res.status(200).json(articles);
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

articlesRouter.post("/", isAuth, async (req, res) => {
    const creator = req.user.id;

    try {
        await SoftWikiArticle.create({...req.body, creator});
        return res.status(200).json({dish: 'Successfully created'});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

articlesRouter.get('/profile', isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findOne({userId}, props + "-password");
        const userIdeas = await Dish.find({creator: userId});
        const ideasCount = userIdeas.length;
        const ideaTitles = userIdeas.map(dish => dish.title);
        const profileData = {
            user: {
                username: user.username,
                userId: user.userId,
                profilePicture: user.profilePicture || "default-profile-picture-url", // Add default if no picture
                createdAt: user.createdAt
            },
            ideasInfo: {
                count: ideasCount,
                message: `Has ${ideasCount} ideas`,
                ideaNames: ideaTitles
            }
        };
        return res.status(200).json(profileData);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

articlesRouter.get('/:articleId', isAuth, async (req, res) => {
    const {articleId} = req.params;

    try {
        const item = await SoftWikiArticle.findOne({articleId}, props).lean();

        if (!item) return res.status(404).json({article: 'No article found.'});

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

articlesRouter.put('/:articleId', isAuth, async (req, res) => {
    const {articleId} = req.params;
    const creator = req.user.id;
    let options = {};

    try {
        const article = await SoftWikiArticle.findOne({articleId, creator}).lean();

        if (!article) return res.status(404).json({message: "Article not found or you are not the author"});

        for (const key in req.body) if (article.hasOwnProperty(key) && article[key] !== req.body[key].trim()) options[key] = req.body[key].trim();

        const output = await SoftWikiArticle.findOneAndUpdate({articleId, creator}, options, {
            runValidators: true,
            returnDocument: 'after'
        });
        const {_id, updatedAt, __v, ...replay} = output.toObject();
        return res.status(200).json(replay);
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(500).json(parseErrorMessage(error));
    }
});

articlesRouter.delete('/:articleId', isAuth, async (req, res) => {
    const {articleId} = req.params;
    const creator = req.user.id;

    try {
        const article = await SoftWikiArticle.findOneAndDelete({articleId, creator});

        if (!article) return res.status(404).json({dish: 'No article found.'});

        return res.status(200).json({dish: "Article deleted"});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default articlesRouter;