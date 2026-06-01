import { render } from "../lib/lit-html.min.js";
import page from "../lib/page.mjs";

const item = "userData";

export function saveUserData(data) {
    // sessionStorage.setItem(item, JSON.stringify(data));
    sessionStorage.setItem(item, JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        token: data.token
    }));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}


export function setNavigation() {
    const isLoggedIn = Boolean(getUserData());
    const menu = document.getElementsByClassName('menu')[0];
    const email = getUserData() ? getUserData().email : null;

    isLoggedIn
        ? menu.style.display = 'block'
        : menu.style.display = 'none'
}

export function decorateCTX(ctx, next) {
    const main = document.getElementsByTagName('main')[0];

    ctx.render = function (content) {
        return render(content, main);
    }
    ctx.setNavigation = setNavigation;
    ctx.userData = getUserData();
    ctx.isRegister = getIsRegister();
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


export function setIsRegister(value) {
    sessionStorage.setItem('isRegister', value ? 'true' : 'false');
}

export function getIsRegister() {
    return sessionStorage.getItem('isRegister') === 'true';
}

export function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}