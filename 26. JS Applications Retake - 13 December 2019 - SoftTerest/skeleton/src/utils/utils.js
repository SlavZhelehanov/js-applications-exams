import { render } from "../lib/lit-html.min.js";
import page from "../lib/page.mjs";

const item = "userData";

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function setNavigation() {
    const isLoggedIn = Boolean(getUserData());
    const header = document.getElementById('ul-navbar');
    const username = getUserData() ? getUserData().user.username : null;

    isLoggedIn
        ? header.innerHTML = `
        <li class="nav-item active"><a class="nav-link" href="/">Dashboard</a></li>
        <li class="nav-item active"><a class="nav-link" href="/create">Create</a></li>
        <li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>
        ` : header.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
        <li class="nav-item"><a class="nav-link" href="/register">Register</a></li>
        `;
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
