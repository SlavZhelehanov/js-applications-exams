import {Router} from "express";
import {v4 as uuidv4} from "uuid";
import User from "../models/User.js";
import {isAuth, isNotAuth, createToken} from "../middlewares/authMiddleware.js";
import {parseErrorMessage} from "../util/parseErrorMessage.js";

const authRouter = Router();

// ALL USERS WITHOUT CURRENT ONE
authRouter.get('/', isAuth, async (req, res) => {
    try {
        const users = await User.find({userId: {$ne: req.user.id}}, '-_id userId username followers');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: "Failed to get users"});
    }
});

// REGISTER
authRouter.post("/register", isNotAuth, async (req, res) => {
    const {username, password} = req.body;

    try {
        const existing = await User.findOne({username});
        if (existing) return res.status(400).json({message: "User already exists"});

        const user = await User.create({username, password, userId: uuidv4()});

        return res.status(200).json({
            message: "Registered",
            token: createToken(user),
            user: {id: user.userId, username: user.username}
        });
    } catch (error) {
        return res.status(500).json({message: "Registration failed"});
    }
});

// LOGIN
authRouter.post("/login", isNotAuth, async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if (!user || !(await user.checkPassword(password))) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        return res.status(200).json({
            message: "Logged in",
            token: createToken(user),
            user: {id: user.userId, username: user.username}
        });
    } catch (error) {
        return res.status(500).json({message: "Login failed"});
    }
});

// LOGOUT
authRouter.get("/logout", isAuth, (req, res) => {
    return res.status(200).json({message: "Logged out"});
});

// CURRENT USER
authRouter.get("/me", isAuth, async (req, res) => {
    try {
        const me = await User.findOne({userId: req.user.id}, 'followers, following -_id').lean();
        return res.status(200).json(me);
    } catch (error) {
        return res.status(500).json({message: "Failed to get current user"});
    }
});

export default authRouter;