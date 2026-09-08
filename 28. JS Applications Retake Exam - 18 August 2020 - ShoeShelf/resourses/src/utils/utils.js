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
        ? ul.innerHTML = `<li><a href="">Create new offer</a></li><li><a href=""><img src="./public/sneakers.png" alt=""></a></li><li>Welcome, ${user?.email || 'email'} | <a  href="">Logout</a></li>`
        : ul.innerHTML = `<li class="site-logo">Shoe</li><li><a href=""><img src="./public/sneakers.png" alt=""></a></li><li class="site-logo">Shelf</li>`
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
