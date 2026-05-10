import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { getUserData, setIsRegister, saveUserData } from "../../utils/utils.js";

function register({ switchPage, onRegister }) {
    return html`
        <section id="viewRegister">
        <div class="content">
            <form class="form" id="formRegister" method="post" @submit=${onRegister}>
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <label>Repeat Password</label>
                <input name="repeatPass" type="password">
                <input id="btnRegister" value="Register" type="submit">
                <a @click=${() => switchPage('login')} href="javascript:void(0)">Log in</a>
            </form>
        </div>
    </section>`;
}

function login({ switchPage, onLogin }) {
    return html`<section id="viewLogin">
        <div class="content">
            <form id="formLogin" class="form" method="post" @submit=${onLogin}>
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <input id="btnLogin" value="Sign In" type="submit">
                <a @click=${() => switchPage('register')} href="javascript:void(0)">Register</a>
            </form>
        </div>
    </section>`;
}

function dashboard() {
    return html`<section id="viewFeed">
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
    const isAuth = getUserData();

    function switchPage(params) {
        if (params === 'login') {
            setIsRegister(false);
            return ctx.page.redirect('/');
        }
        setIsRegister(true);
        return ctx.page.redirect('/');
    }

    if (isAuth) {
        return ctx.render(dashboard());
    } else if (ctx.isRegister) {
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username').trim();
            // const gender = formData.get('gender').trim();
            // const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            const repass = formData.get('repeatPass').trim();

            if (username === '' || password === '') return alert('All fields are required');
            if (password !== repass) return alert("Passwords don't match");

            try {
                const res = await post("/auth/register", { username, password });
                console.log(res);


                if (399 < res.status) throw res.statusText;

                saveUserData(res.user);
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }

        return ctx.render(register({ switchPage, onRegister }));
    } else {
        async function onLogin(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            // const email = formData.get('email');
            const username = formData.get('username');
            const password = formData.get('password');

            // if (email.trim() === '' || password.trim() === '') return showError('All fields are required!');
            if (username.trim() === '' || password.trim() === '') return showError('All fields are required!');

            try {
                // const user = await post("/users/login", { email, password });
                const user = await post("/auth/login", { username, password });

                if (399 < user.status) throw user.statusText;

                saveUserData(user);
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }

        return ctx.render(login({ switchPage, onLogin }));
    }
}