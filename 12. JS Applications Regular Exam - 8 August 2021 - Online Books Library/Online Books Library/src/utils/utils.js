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
    const authDiv = document.getElementsByTagName('nav')[0].getElementsByTagName('div')[0];
    const email = getUserData()?.email;

    isLoggedIn
        ? [authDiv.id = 'user', authDiv.innerHTML = `<span>Welcome, ${email}</span><a class="button" href="/my-books">My Books</a><a class="button" href="/create">Add Book</a><a class="button" href="/logout">Logout</a>`]
        : [authDiv.id = 'guest', authDiv.innerHTML = '<a class="button" href="/login">Login</a><a class="button" href="/register">Register</a>'];
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