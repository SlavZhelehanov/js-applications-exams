import {render} from "../lib/lit-html.min.js";
import page from "../lib/page.js";

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
    const nav = document.getElementsByTagName('nav')[0];
    const username = getUserData() ? getUserData().username : null;

    isLoggedIn
        ? nav.innerHTML = `<a href="/">All Listings</a><a href="/my-listings">My Listings</a><a href="/create">Create Listing</a><div id="profile"><a>Welcome ${username}</a><a href="/logout">logout</a></div>`
        : nav.innerHTML = `<a class="active" href="/">Home</a>`
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
        else if (status === 'guest' && isUser) page.redirect('/');
        else page.redirect('/');
    };
}

export function showMessage(msgType, msgText) {
    const box = document.querySelector('.notification');

    box.id = msgType;
    box.querySelector('span').textContent = msgText;
    box.style.display = 'block';

    if (msgType === 'loadingBox') return;

    return new Promise(resolve => {
        setTimeout(() => {
            box.style.display = 'none';
            resolve();
        }, 3000);
    });
}