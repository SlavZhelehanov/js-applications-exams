import jwt from "jsonwebtoken";

import {SUPER_SECRET, COOKIE_NAME} from "../util/envConstats.js";

export const auth = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, SUPER_SECRET);
        req.user = decoded;
        res.locals.user = decoded;
        return next();
    } catch (err) {
        res.clearCookie(COOKIE_NAME);
        delete req.user;
        delete res.locals.user;
        return res.redirect("/login");
    }
};

export const isUser = (req, res, next) => {
    if (req.user) return next();
    return res.redirect("/login");
};

export const isGuest = (req, res, next) => {
    if (req.user) return res.redirect("/");
    return next();
};