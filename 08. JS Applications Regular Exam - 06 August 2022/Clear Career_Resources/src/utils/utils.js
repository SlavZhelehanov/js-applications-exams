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
    const [_, authDiv] = document.getElementsByTagName('nav')[0].getElementsByTagName('div');
    const [a1, a2] = authDiv.getElementsByTagName('a');

    isLoggedIn
        ? [authDiv.className = 'user', a1.href = '/createOffer', a2.href = '/logout', a1.textContent = 'Create Offer', a2.textContent = 'Logout']
        : [authDiv.className = 'guest', a1.href = '/login', a2.href = '/register', a1.textContent = 'Login', a2.textContent = 'Register'];
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