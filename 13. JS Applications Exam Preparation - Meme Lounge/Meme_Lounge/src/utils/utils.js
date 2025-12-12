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
    const email = getUserData() ? getUserData().email : null;

    isLoggedIn
        ? [authDiv.className = 'user', authDiv.innerHTML = `<a href="/create">Create Meme</a><div class="profile"><span>Welcome, ${email}</span><a href="/my-profile">My Profile</a><a href="/logout">Logout</a></div>`]
        : [authDiv.className = 'guest', authDiv.innerHTML = `<div class="profile"><a href="/login">Login</a><a href="/register">Register</a></div><a class="active" href="/">Home Page</a>`];
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

export function showError(message) {
    const errorBox = document.querySelector('.notification');
    
    errorBox.querySelector('span').textContent = message;
    errorBox.style.display = 'block';
    
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}