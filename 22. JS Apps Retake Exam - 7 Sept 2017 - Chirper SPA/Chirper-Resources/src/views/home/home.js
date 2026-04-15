import { html } from "../../lib/lit-html.min.js";
import { getisLogin, setIsLogin } from "../../utils/utils.js";

function register({ redirectTo }) {
    return html`
        <section id="viewRegister">
        <div class="content">
            <form class="form" id="formRegister">
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <label>Repeat Password</label>
                <input name="repeatPass" type="password">
                <input id="btnRegister" value="Register" type="submit">
                <a @click=${() => redirectTo('login')} href="javascript:void(0)">Log in</a>
            </form>
        </div>
    </section>`;
}

function login({ redirectTo }) {
    return html`
        <section id="viewLogin">
        <div class="content">
            <form id="formLogin" class="form">
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <input id="btnLogin" value="Sign In" type="submit">
                <a @click=${() => redirectTo('register')} href="javascript:void(0)">Register</a>
            </form>
        </div>
    </section>`;
}
export async function homePage(ctx) {
    const isAuth = !!ctx.userData, isLogin = getisLogin();    

    function redirectTo(param) {
        if (param === 'login') setIsLogin(true);
        else setIsLogin(false);
        return ctx.page.redirect('/');
    }

    if (!isAuth && !isLogin) {
        return ctx.render(register({ redirectTo }));
    } else if (!isAuth && isLogin) {
        return ctx.render(login({ redirectTo }));
    }
}