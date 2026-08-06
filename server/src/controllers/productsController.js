import {Router} from 'express';
import {isAuth} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import Product from "../models/Product.js";
import Dish from "../models/Dish.js";

const productsRouter = Router();
const props = '-_id -__v -updatedAt';

productsRouter.get("/", isAuth, async (req, res) => {
    try {
        const products = await Dish.find({}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(products);
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

productsRouter.post("/", isAuth, async (req, res) => {
    const creator = req.user.id;

    try {
        await Dish.create({...req.body, creator});
        return res.status(200).json({dish: 'Successfully created'});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

productsRouter.get('/my-messages', isAuth, async (req, res) => {
    const receiverId = req.user.id;

    try {
        const messages = await Product.find({receiverId}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

productsRouter.get('/archive', isAuth, async (req, res) => {
    const creator = req.user.id;

    try {
        const messages = await Product.find({creator}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

productsRouter.get('/:dishId', isAuth, async (req, res) => {
    const {dishId} = req.params;

    try {
        const dish = await Dish.findOne({dishId}, props).lean();

        if (!dish) return res.status(404).json({dish: 'No dish found.'});

        return res.status(200).json(dish);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

productsRouter.delete('/:dishId', isAuth, async (req, res) => {
    const {dishId} = req.params;
    const creator = req.user.id;

    try {
        const dish = await Dish.findOneAndDelete({dishId, creator});

        if (!dish) return res.status(404).json({dish: 'No dish found.'});

        return res.status(200).json({dish: "Dish deleted"});
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default productsRouter;