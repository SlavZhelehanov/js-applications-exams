import { html } from "../../lib/lit-html.min.js";
import { post, get } from "../../utils/api.js";
import { getUserData, setIsRegister, saveUserData, calcTime, showNotification } from "../../utils/utils.js";

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

function dashboard({ data, user, username, chirps, onCreate }) {
    return html`<section id="viewFeed">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">${username}</h2>

                <form id="formSubmitChirp" class="chirp-form" method="post" @submit=${onCreate}>
                    <textarea name="text" class="chirp-input"></textarea>
                    <input class="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit">
                </form>

                <div id="userStats" class="user-details">
                    <span>${chirps?.length || 0} chirps</span> | <span>${user?.following?.length || 0} following</span> | <span>${user?.followers?.length || 0} followers</span>
                </div>
            </div>
            <div id="chirps" class="chirps"><h2 class="titlebar">Chirps</h2>
                ${0 < data.length
            ? data.map(ch => html`
                        <article class="chirp">
                    <div class="titlebar">
                        <a href="/profile/${ch.author}" class="chirp-author">${ch.author}</a>
                        <span class="chirp-time">${calcTime(ch.createdAt)}</span>
                    </div>
                    <p>${ch.text}</p>
                </article>`)
            : null
        }
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
        let data = [], user = {}, chirps = [];

        async function onCreate(e) {
            e.preventDefault();

            const formData = new FormData(e.target);
            // const item = {
            //     name: formData.get('name').trim(),
            //     imgUrl: formData.get('imgUrl').trim(),
            //     price: formData.get('price').trim(),
            //     releaseDate: formData.get('releaseDate').trim(),
            //     artist: formData.get('artist').trim(),
            //     genre: formData.get('genre').trim(),
            //     description: formData.get('description').trim()
            // }
            const text = formData.get('text').trim();

            // if (Object.values(item).some((x) => !x)) return alert("All fields are required!");
            if (!text || text.length === 0) return alert("All fields are required!");

            try {
                await post("/chirps", { text });
                e.target.reset();
                ctx.page.redirect('/');
            } catch (err) {
                alert(err.message);
            }
        }

        try {
            data = await get("/chirps");
            user = await get('/auth/me');
            const chrpUsrData = await get('/chirps/me');
            chirps = chrpUsrData.chirps;
        } catch (error) {
            if (error.message) alert(error.message);
            else alert(error);
        }
        return ctx.render(dashboard({ chirps, data, onCreate, user, username: isAuth.username }));
    } else if (ctx.isRegister) {
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username').trim();
            // const gender = formData.get('gender').trim();
            // const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            const repass = formData.get('repeatPass').trim();

            // if (username === '' || password === '') return alert('All fields are required');
            if (username.length < 5) return showNotification('error', 'A username should be a string with at least 5 characters long');
            if (password !== repass || password === '') return showNotification('error', "Passwords input fields shouldn’t be empty and both passwords should match.");

            try {
                showNotification('loading', 'Loading...')
                const res = await post("/auth/register", { username, password });
                console.log(res);


                if (399 < res.status) throw res.statusText;

                saveUserData(res);
                showNotification('info', 'User registration successful.');
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) showNotification('error', err.message);
                else showNotification('error', err);
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