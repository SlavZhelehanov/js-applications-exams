import { html } from "../../lib/lit-html.min.js";
import { get, post, put } from "../../utils/api.js";
import { getisLogin, setIsLogin, saveUserData, calcTime } from "../../utils/utils.js";

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

function dashboard({ onCreate, data, chirps, following, followers }) {
    return html`
        <section id="viewFeed">
        <div class="content">
            <div class="chirper">
                <h2 class="titlebar">Pesho</h2>

                <form id="formSubmitChirp" class="chirp-form" method="post" @submit=${onCreate}>
                    <textarea name="text" class="chirp-input"></textarea>
                    <input class="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit">
                </form>

                <div id="userStats" class="user-details">
                    <span>${chirps.length} chirps</span> | <span>${following.length} following</span> | <span>${followers.length} followers</span>
                </div>
            </div>
            <div id="chirps" class="chirps"><h2 class="titlebar">Chirps</h2>
                ${0 < data.length
            ? data.map(ch => html`<article class="chirp">
                    <div class="titlebar">
                        <a href="/profile/${ch.author}" class="chirp-author">${ch.author}</a>
                        <span class="chirp-time">${calcTime(ch.createdAt)}</span>
                    </div>
                    <p>yohooo</p>
                </article>`)
            : null
        }
                
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
                const userSeed = await post("/jsonstore/users", { username, followers: [], following: [], chirps: [] });

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
    } else {
        const userData = ctx.userData;
        let data = [], chirps = 0, following = 0, followers = 0;

        async function onCreate(e) {
            e.preventDefault();

            const formData = new FormData(e.target);
            const text = formData.get('text').trim();

            if (!text) return alert("All fields are required!");

            try {
                const users = await get("/jsonstore/users");
                let user = {};

                Object.keys(users).forEach(u => {
                    if (users[u].username === userData.username) user = users[u];
                });

                const chrp = await post("/jsonstore/chirps", { text, author: user.username, createdAt: Date.now() });

                user.chirps.push(chrp);
                await put(`/jsonstore/users/${user._id}`, user);
                e.target.reset();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }

        try {
            const res = await get("/jsonstore/chirps?sortBy=_createdOn%20desc");
            const usrs = await get("/jsonstore/users");
            Object.keys(res).forEach(k => data.push(res[k]));
            Object.keys(usrs).forEach(async (k) => {
                if (usrs[k].username === userData.username) {
                    followers = usrs[k].followers;
                    following = usrs[k].following;
                    chirps = usrs[k].chirps;
                }
            });
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }

        return ctx.render(dashboard({ onCreate, data, chirps, following, followers }));
    }
}