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
    const header = document.getElementsByTagName('header')[0];
    const username = getUserData() ? getUserData().username : null;

    isLoggedIn
        ? [
            header.style.display = 'block',
            header.innerHTML = `<div id="cashier">
                <span>Cashier: </span>
                <a href="/">${username}</a>
            </div>
            <nav id="nav">
                <ul>
                    <li>
                        <a href="/">Editor</a>
                    </li>
                    <li>
                        <a href="/dashboard">Overview</a>
                    </li>
                    <li>
                        <a href="/logout" class="logout">Logout</a>
                    </li>
                </ul>
            </nav>`
        ]
        : header.style.display = 'none';
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