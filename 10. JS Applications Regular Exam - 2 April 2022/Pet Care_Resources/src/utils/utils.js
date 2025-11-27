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
    const [li1, li2, li3, li4] = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName("li");
    const a3 = li3.getElementsByTagName("a")[0], a4 = li4.getElementsByTagName("a")[0];

    isLoggedIn
        ? [a3.href = "/create", a3.textContent = "Create Postcard", a4.href = "/logout", a4.innerText = "Logout"]
        : [a3.href = "/login", a3.textContent = "Login", a4.href = "/register", a4.innerText = "Register"];
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