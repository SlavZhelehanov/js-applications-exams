const item = "userData";

export function saveUserData(data) {
    // sessionStorage.setItem(item, JSON.stringify(data));
    sessionStorage.setItem(item, JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        token: data.token
    }));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function setNavigation() {
    const isLoggedIn = Boolean(getUserData());
    const menu = document.getElementById('menu');
    const username = getUserData() ? getUserData().username : null;

    !isLoggedIn
        ? menu.innerHTML = `<a href="/" class="anonymous" id="linkMenuAppHome">Home</a>
            <a href="/login" class="anonymous" id="linkMenuLogin">Login</a>
            <a href="/register" class="anonymous" id="linkMenuRegister">Register</a>`
        : menu.innerHTML = `<a href="#" class="useronly" id="linkMenuUserHome">Home</a>
            <a href="/shop" class="useronly" id="linkMenuShop">Shop</a>
            <a href="/cart" class="useronly" id="linkMenuCart">Cart</a>
            <a href="/logout" class="useronly" id="linkMenuLogout">Logout</a>

            <span class="useronly" id="spanMenuLoggedInUser">Welcome, ${username}!</span>`
}

export function decorateCTX(ctx, next) {
    const main = document.getElementsByTagName('main')[0];

    ctx.render = function (content) {
        return render(content, main);
    }
    ctx.setNavigation = setNavigation;
    ctx.userData = getUserData();
    ctx.isRegister = getIsRegister();
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

export function formatPrice(price) {
    let num = Number(price);
    if (isNaN(num)) return "0.00";
    return num.toFixed(2);
}