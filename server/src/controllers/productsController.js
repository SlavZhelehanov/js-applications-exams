import {Router} from 'express';
import {isAuth} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import Movie from "../models/Movie.js";
import {escapeRegex} from "../util/common.js";

const moviesRouter = Router();
const props = '-_id -__v -updatedAt';

moviesRouter.get("/", isAuth, async (req, res) => {
    try {
        const movies = await Movie.find({}, props).lean();
        return res.status(200).json(movies);
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

moviesRouter.post("/", isAuth, async (req, res) => {
    const creator = req.user.id;

    try {
        await Movie.create({...req.body, creator});
        return res.status(200).json({dish: 'Successfully created'});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});


    try {
        const item = await ShoeShelf.findOne({shoeShelfId}, props).lean();

moviesRouter.get('/:movieId', isAuth, async (req, res) => {
    const {movieId} = req.params;

    try {
        const item = await Movie.findOne({movieId}, props).lean();

        if (!item) return res.status(404).json({movie: 'No movie found.'});

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

moviesRouter.put('/:movieId', isAuth, async (req, res) => {
    const {movieId} = req.params;
    const creator = req.user.id;
    let options = {};

    try {
        const movie = await Movie.findOne({movieId, creator}).lean();

        if (!movie) return res.status(404).json({message: "Movie not found or you are not the author"});

        for (const key in req.body) if (movie.hasOwnProperty(key) && movie[key] !== req.body[key].trim()) options[key] = req.body[key].trim();

        const output = await Movie.findOneAndUpdate({movieId, creator}, options, {
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

moviesRouter.put('/:movieId/like', isAuth, async (req, res) => {
    const {movieId} = req.params;
    const userId = req.user.id;

    try {
        const movie = await Movie.findOne({movieId});

        if (!movie) return res.status(404).json({message: "Movie not found or you are not the author"});
        if (movie.creator === userId) return res.status(409).json({message: "You can't buy your own movie"});
        if (movie.likedFrom.includes(userId)) return res.status(409).json({message: "User has already liked this movie"});

        movie.likedFrom.push(userId);
        await movie.save();

        return res.status(200).json({message: "Purchase successful"});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(500).json(parseErrorMessage(error));
    }
});

moviesRouter.delete('/:movieId', isAuth, async (req, res) => {
    const {movieId} = req.params;
    const creator = req.user.id;

    try {
        const movie = await Movie.findOneAndDelete({movieId, creator});

        if (!movie) return res.status(404).json({dish: 'No movie found.'});

        return res.status(200).json({dish: "Movie deleted"});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default moviesRouter;