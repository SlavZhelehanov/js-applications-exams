import {Router} from 'express';
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import Message from "../models/Message.js";

const productsRouter = Router();
const props = '-_id -__v -updatedAt'

productsRouter.get('/my-messages', isAuth, async (req, res) => {
    const receiverId = req.user.id;

    try {
        const messages = await Message.find({receiverId}, props).sort({createdAt: -1}).lean();
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});
