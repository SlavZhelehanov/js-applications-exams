import {Router} from 'express';
import {auth} from "../middlewares/authMiddleware.js";
import Product from "../models/Product.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import User from "../models/User.js";

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

productsRouter.put('/:productId/purchase', auth, async (req, res) => {
    const {productId} = req.params;
    const {userId} = req.user;

    try {
        const product = await Product.findOne({productId}).lean();

        if (!product) return res.status(404).json({error: "Product not found"});

        await User.findOneAndUpdate({userId}, {
            $push: {
                cart: {
                    productId,
                    quantity: 1
                }
            }
        });
        console.log(product)
        return res.status(200).json({message: "Added to cart"});
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default productsRouter;