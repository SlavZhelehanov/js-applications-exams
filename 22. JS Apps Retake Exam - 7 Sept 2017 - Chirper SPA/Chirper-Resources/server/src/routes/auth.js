import {Router} from "express";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import User from "../models/User.js";
import {isAuth, isNotAuth} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";

const authRouter = Router();

// REGISTER
authRouter.post("/register", isNotAuth, async (req, res) => {
    const {username, password} = req.body;

    try {
        const existing = await User.findOne({username});

        if (existing) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword, userId: uuidv4()});

        req.session.user = {id: user.userId, username: user.username};
        return res.status(200).json({message: "Registered", user: req.session.user});
    } catch (error) {
        return res.status(500).json({message: "Registration failed", error: parseErrorMessage(error)});
    }
});
