import {Router} from 'express';
import {isAuth} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";
import ShoeShelf from "../models/ShoeShelf.js";

const shoeShelfRouter = Router();
const props = '-_id -__v -updatedAt';

shoeShelfRouter.get("/", isAuth, async (req, res) => {
    try {
        const shoes = await ShoeShelf.aggregate([
            {
                $addFields: {
                    peopleBoughtItCount: {$size: "$peopleBoughtIt"}
                }
            },
            {
                $sort: {peopleBoughtItCount: -1}
            }
        ]);
        return res.status(200).json(shoes);
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

shoeShelfRouter.post("/", isAuth, async (req, res) => {
    const creator = req.user.id;

    try {
        await ShoeShelf.create({...req.body, creator});
        return res.status(200).json({dish: 'Successfully created'});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(400).json(parseErrorMessage(error));
    }
});

shoeShelfRouter.get('/:shoeShelfId', isAuth, async (req, res) => {
    const {shoeShelfId} = req.params;

    try {
        const item = await ShoeShelf.findOne({shoeShelfId}, props).lean();

        if (!item) return res.status(404).json({shoe: 'No shoe found.'});

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(parseErrorMessage(error));
    }
});

shoeShelfRouter.put('/:shoeShelfId', isAuth, async (req, res) => {
    const {shoeShelfId} = req.params;
    const creator = req.user.id;
    let options = {};

    try {
        const shoe = await ShoeShelf.findOne({shoeShelfId, creator}).lean();

        if (!shoe) return res.status(404).json({message: "Shoe not found or you are not the author"});

        for (const key in req.body) if (shoe.hasOwnProperty(key) && shoe[key] !== req.body[key].trim()) options[key] = req.body[key].trim();

        const output = await ShoeShelf.findOneAndUpdate({shoeShelfId, creator}, options, {
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

shoeShelfRouter.put('/:shoeShelfId/buy', isAuth, async (req, res) => {
    const {shoeShelfId} = req.params;
    const userId = req.user.id;

    try {
        const shoe = await ShoeShelf.findOne({shoeShelfId});

        if (!shoe) return res.status(404).json({message: "Shoe not found or you are not the author"});
        if (shoe.creator === userId) return res.status(409).json({message: "You can't buy your own shoe"});
        if (shoe.peopleBoughtIt.includes(userId)) return res.status(409).json({message: "User has already bought this shoe"});

        shoe.peopleBoughtIt.push(userId);
        await shoe.save();

        return res.status(200).json({message: "Purchase successful"});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(500).json(parseErrorMessage(error));
    }
});

shoeShelfRouter.delete('/:shoeShelfId', isAuth, async (req, res) => {
    const {shoeShelfId} = req.params;
    const creator = req.user.id;

    try {
        const shoe = await ShoeShelf.findOneAndDelete({shoeShelfId, creator});

        if (!shoe) return res.status(404).json({dish: 'No shoe found.'});

        return res.status(200).json({dish: "Shoe deleted"});
    } catch (error) {
        console.log(parseErrorMessage(error))
        return res.status(500).json(parseErrorMessage(error));
    }
});

export default shoeShelfRouter;