import { render } from "../lib/lit-html.min.js";
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
    // const header = document.getElementsByTagName('header')[0];
    const header = document.getElementsByClassName('menu')[0];
    // const username = getUserData() ? getUserData().username : null;

    isLoggedIn
        ? header.style.display = 'block'
        : header.style.display = 'none';
}

export function setIsLogin(data) {
    sessionStorage.setItem('isLogin', JSON.stringify(data));
}

export function getisLogin() {
    return JSON.parse(sessionStorage.getItem('isLogin'));
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

export function calcTime(dateIsoFormat) {
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }

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
}