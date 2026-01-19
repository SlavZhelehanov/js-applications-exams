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
    const [fu, su, _, tu] = document.getElementById('navbarText').getElementsByTagName('ul');
    const [fl1, fl2, fl3] = fu.getElementsByTagName('li');
    const [sl1, sl2] = su.getElementsByTagName('li');
    const [tl1, tl2] = tu.getElementsByTagName('li');
    const username = getUserData() ? getUserData().username : null;

    console.log(isLoggedIn, username)

    isLoggedIn
        ? [fu.style.display = "block",
            su.style.display = "block",
            fl1.innerHTML = `<a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>`,
            fl2.innerHTML = `<a class="nav-link" href="/app">All Songs</a>`,
            fl3.innerHTML = `<a class="nav-link " href="/my-songs">My Songs</a>`,
            sl1.innerHTML = `<a class="nav-link" href="/create">Welcome, ${username}!</a>`,
            sl2.innerHTML = `<a class="nav-link" href="/logout">Logout</a>`,
            tu.style.display = "none"]
        : [fu.style.display = "none",
            su.style.display = "none",
            tu.style.display = "block",
            tl1.innerHTML = `<a class="nav-link" href="/login">Login</a>`,
            tl2.innerHTML = `<a class="nav-link" href="/register">Register</a>`];
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