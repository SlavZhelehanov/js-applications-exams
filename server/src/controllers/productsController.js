import {Router} from 'express';
import {isAuth} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import Product from "../models/Product.js";

const productsRouter = Router();
const props = '-_id -__v -updatedAt';

productsRouter.post("/", isAuth, async (req, res) => {
    const creator = req.user.id;

    try {
        await Product.create({...req.body, creator});
        return res.status(200).json({message: 'Successfully created'});
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

productsRouter.delete('/:messageId', isAuth, async (req, res) => {
    const {messageId} = req.params;
    const creator = req.user.id;

    try {
        const message =  await Product.findOneAndDelete({messageId, creator});

        if (!message) return res.status(404).json({message: 'No message found.'});

        return res.status(200).json({message: "Product deleted"});
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default productsRouter;