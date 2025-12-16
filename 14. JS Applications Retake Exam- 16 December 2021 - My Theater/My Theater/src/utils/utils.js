import {render} from "../lib/lit-html.min.js";
import page from "../lib/page.mjs";

const item = "userData";

export function saveUserData(data) {
    sessionStorage.setItem(item, JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function clearUserData() {
    sessionStorage.removeItem(item);
}

export function setNavigation() {
    const isLoggedIn = Boolean(getUserData());
    const authUl = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0];

    isLoggedIn
        ? authUl.innerHTML = '<li><a href="/profile">Profile</a></li><li><a href="/create">Create Event</a></li><li><a href="/logout">Logout</a></li>'
        : authUl.innerHTML = '<li><a href="login">Login</a></li><li><a href="/register">Register</a></li>';
}

export function decorateCTX(ctx, next) {
    const main = document.getElementsByTagName('main')[0];

    ctx.render = function (content) {
        return render(content, main);
    }
    ctx.setNavigation = setNavigation;
    ctx.userData = getUserData();
    next();
}

export function guardRoute(status) {
    return function (ctx, next) {
        const user = getUserData();
        const isUser = Boolean(user);

        if ((status === 'user' && isUser) || (status === 'guest' && !isUser)) next();
        else page.redirect('/');
    };
}