import {Router} from 'express';
import {auth} from "../middlewares/authMiddleware.js";
import Product from "../models/Product.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const props = '-_id -__v -updatedAt'
        const products = await Product.find({}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default productsRouter;