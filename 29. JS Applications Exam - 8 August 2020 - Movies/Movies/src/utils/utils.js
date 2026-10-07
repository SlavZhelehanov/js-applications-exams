import { render } from "../lib/lit-html.min.js";
import page from "../lib/page.mjs";

const item = "userData";

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function setNavigation() {
    const user = getUserData();
    const isLoggedIn = Boolean(user);
    const ul = document.getElementsByTagName('ul')[0];

    isLoggedIn
        ? ul.innerHTML = `<li class="nav-item">
                    <a class="nav-link">Welcome, ${user.user.email}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>`
        : ul.innerHTML = `<li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>`
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