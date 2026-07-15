import { render } from "../lib/lit-html.min.js";
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
    const header = document.getElementById('menu');
    const username = getUserData() ? getUserData().user.username : null;

    !isLoggedIn
        ? header.innerHTML = `
        <a href="/" class="anonymous" id="linkMenuAppHome">Home</a>
        <a href="/login" class="anonymous" id="linkMenuLogin">Login</a>
        <a href="/register" class="anonymous" id="linkMenuRegister">Register</a>
        ` : header.innerHTML = `
        <a href="/" class="useronly" id="linkMenuUserHome">Home</a>
        <a href="/my-messages" class="useronly" id="linkMenuMyMessages">My Messages</a>
        <a href="/archive" class="useronly" id="linkMenuArchiveSent">Archive (Sent)</a>
        <a href="/send" class="useronly" id="linkMenuSendMessage">Send Message</a>
        <a href="/logout" class="useronly" id="linkMenuLogout">Logout</a>

        <span class="useronly" id="spanMenuLoggedInUser">Welcome, ${username}!</span>
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