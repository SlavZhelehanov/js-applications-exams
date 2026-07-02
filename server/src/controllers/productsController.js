import {Router} from 'express';
import {isAuth} from "../middlewares/authMiddleware.js";
import Product from "../models/Product.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import User from "../models/User.js";

const productsRouter = Router();

productsRouter.get('/', isAuth, async (req, res) => {
    try {
        const props = '-_id -__v -updatedAt'
        const products = await Product.find({}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

productsRouter.get('/cart', isAuth, async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findOne({userId: id}).lean();

        if (!user) return res.status(404).json({error: "User not found"});
        
        const products = await Promise.all(user.cart?.map(async ({productId, quantity}) => {
            const product = await Product.findOne({productId}, '-_id -__v -updatedAt').lean();
            return {...product, quantity};
        }));

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

productsRouter.put('/:productId/purchase', isAuth, async (req, res) => {
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