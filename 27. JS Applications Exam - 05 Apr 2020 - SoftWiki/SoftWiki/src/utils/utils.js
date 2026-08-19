import { render } from "../lib/lit-html.min.js";
import page from "../lib/page.mjs";

const item = "userData";

export function saveUserData(data) {
    sessionStorage.setItem(item, JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function setNavigation() {
    const isLoggedIn = Boolean(getUserData());
    const header = document.getElementById('ul-navbar');
    const username = getUserData() ? getUserData().user.username : null;

    isLoggedIn
        ? header.innerHTML = `<a href="/create">Create</a><a href="/logout">Logout</a>` 
        : header.innerHTML = `<a href="/register">Register</a>`;
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
