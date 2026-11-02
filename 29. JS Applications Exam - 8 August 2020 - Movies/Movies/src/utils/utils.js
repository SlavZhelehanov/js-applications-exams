import { render } from "../lib/lit-html.min.js";
import page from "../lib/page.mjs";

const item = "userData";
let notificationTimeout;

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

function showNotification(type, message, delay = 3000) {
    const notification = document.getElementById(`${type}Notification`);
    const messageBox = document.getElementById(`${type}Box`);

    clearTimeout(notificationTimeout);

    document.querySelectorAll(".notifications").forEach(el => { el.style.display = "none"; });

    messageBox.textContent = message;
    notification.style.display = "block";

    notificationTimeout = setTimeout(() => {
        notification.style.display = "none";
    }, delay);
}

export function showError(message, delay = 3000) {
    showNotification("error", message, delay);
}

export function showSuccess(message, delay = 3000) {
    showNotification("success", message, delay);
}