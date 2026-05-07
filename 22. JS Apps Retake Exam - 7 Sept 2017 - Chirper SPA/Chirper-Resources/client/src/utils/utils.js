import { render } from "../lib/lit-html.min.js";
const item = "userData";
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
    next();
}
