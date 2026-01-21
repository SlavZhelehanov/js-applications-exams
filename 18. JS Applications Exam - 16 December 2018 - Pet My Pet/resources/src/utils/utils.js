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
    const navbar = document.getElementsByClassName("navbar")[0];
    const username = getUserData() ? getUserData().username : null;

    isLoggedIn
        ? navbar.innerHTML = `<section class="navbar-dashboard">
                <div class="first-bar">
                    <a href="/app">Dashboard</a>
                    <a class="button" href="/my-pets">My Pets</a>
                    <a class="button" href="/create">Add Pet</a>
                </div>
                <div class="second-bar">
                    <ul>
                        <li>Welcome, ${username}!</li>
                        <li><a href="/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                </div>
            </section>`
        : navbar.innerHTML = `<section class="navbar-anonymous">
                <ul>
                    <li><a href="/register"><i class="fas fa-user-plus"></i> Register</a></li>
                    <li><a href="/login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                </ul>
            </section>`;
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

export async function showMessage(id, message) {
    // const errorBox = document.querySelector('.notification');
    const notificationDiv = document.getElementById("notifications").getElementsByTagName('div')[0];

    if(id === 'loading') {
        notificationDiv.id = 'loadingBox';
    } else if (id === 'info') {
        notificationDiv.id = 'infoBox';
    } else {
        notificationDiv.id = 'errorBox';
    }

    notificationDiv.innerHTML = `<span>${message}</span>`;
    notificationDiv.style.display = 'block';
    notificationDiv.addEventListener('click', () => notificationDiv.style.display = 'none');
    // errorBox.querySelector('span').textContent = message;
    // errorBox.style.display = 'block';
    if(id !== 'loading') {
        return new Promise((resolve, reject) => setTimeout(() => {
            resolve(notificationDiv.style.display = 'none');
        }, 3000));
    }

}