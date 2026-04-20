import { html } from "../../lib/lit-html.min.js";
import { get, post } from "../../utils/api.js";
import { getisLogin, setIsLogin, saveUserData } from "../../utils/utils.js";

function register({ redirectTo, onRegister }) {
    return html`
        <section id="viewRegister">
        <div class="content">
            <form class="form" id="formRegister" method='post' @submit=${onRegister}>
                <label>Username</label>
                <input name="username-register" type="text">
                <label>Password</label>
                <input name="password-register" type="password">
                <label>Repeat Password</label>
                <input name="password-register-check" type="password">
                <input id="btnRegister" value="Register" type="submit">
                <a @click=${() => redirectTo('login')} href="javascript:void(0)">Log in</a>
            </form>
        </div>
    </section>`;
}

function login({ redirectTo, onLogin }) {
    return html`
        <section id="viewLogin">
        <div class="content">
            <form id="formLogin" class="form" method='post' @submit=${onLogin}>
                <label>Username</label>
                <input name="username-login" type="text">
                <label>Password</label>
                <input name="password-login" type="password">
                <input id="btnLogin" value="Sign In" type="submit">
                <a @click=${() => redirectTo('register')} href="javascript:void(0)">Register</a>
            </form>
        </div>
    </section>`;
}

function dashboard({ data, onDelete, onCreate, onCheckout, total }) {
    return html`
        <section id="viewFeed">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">Pesho</h2>

                <form id="formSubmitChirp" class="chirp-form">
                    <textarea name="text" class="chirp-input"></textarea>
                    <input class="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit">
                </form>

                <div id="userStats" class="user-details">
                    <span>0 chirps</span> | <span>1 following</span> | <span>0 followers</span>
                </div>
            </div>
            <div id="chirps" class="chirps"><h2 class="titlebar">Chirps</h2>
                <article class="chirp">
                    <div class="titlebar">
                        <a href="#" class="chirp-author">vako</a>
                        <span class="chirp-time">1 day</span>
                    </div>
                    <p>yohooo</p>
                </article>
                <!-- TODO Load more articles -->
            </div>
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
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username-register');
            const password = formData.get('password-register');
            const repass = formData.get('password-register-check');

            if (username === '' || password === '') return alert('All fields are required');
            if (typeof username !== 'string' || username.length < 5) return alert('A username should be a string with at least 5 characters long.');
            if (password !== repass) return alert("Both passwords should match.");

            try {
                const user = await post("/users/register", { username, password });

                if (399 < user.status) throw user.statusText;

                saveUserData(user);
                await alert('User registration successful');
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }

        return ctx.render(register({ redirectTo, onRegister }));
    } else if (!isAuth && isLogin) {
        async function onLogin(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username-login');
            const password = formData.get('password-login');

            if (username.trim() === '' || password.trim() === '') return alert('All fields are required!');
            if (typeof username !== 'string' || username.length < 5) return alert('A username should be a string with at least 5 characters long.');

            try {
                const user = await post("/users/login", { username, password });

                if (399 < user.status) throw user.statusText;

                saveUserData(user);
                alert('Login successful');
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }

        return ctx.render(login({ redirectTo, onLogin }));
    }
    } else {

        return ctx.render(dashboard());
    }
}