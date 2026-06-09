import { html } from "../../lib/lit-html.min.js";
import { post, get, del } from "../../utils/api.js";
import { getUserData, setIsRegister, saveUserData, calcTime, showNotification } from "../../utils/utils.js";

function welcome({ onRegister, onLogin }) {
    return html`
        <section id="viewWelcome">
            <div class="welcome">
                <div class="signup">
                    <form id="loginForm" method="post" @submit=${onLogin}>
                        <h2>Sign In</h2>
                        <label>Username:</label>
                        <input name="login-username" type="text">
                        <label>Password:</label>
                        <input name="login-password" type="password">
                        <input id="btnLogin" value="Sign In" type="submit">
                    </form>
                    <form id="registerForm" method="post" @submit=${onRegister}>
                        <h2>Register</h2>
                        <label>Username:</label>
                        <input name="register-username" type="text">
                        <label>Password:</label>
                        <input name="register-password" type="password">
                        <label>Repeat Password:</label>
                        <input name="repeatPass" type="password">
                        <input id="btnRegister" value="Sign Up" type="submit">
                    </form>
                </div>

                <div class="about">
                    <h1>Welcome to SeenIt</h1>
                    <p>
                        Share interesting links and discuss great content. It's what's happening now.
                    </p>
                    <p>Sign in or sign up in a second.</p>
                </div>
            </div>
        </section>`;
}

function dashboard({ data, onDelete, isAuth }) {
    return html`<section id="viewCatalog">
            <div class="posts">
                ${0 < data.length
            ? data.map((pst, idx) => html`<article class="post">
                    <div class="col rank">
                        <span>${idx + 1}</span>
                    </div>
                    <div class="col thumbnail">
                        <a href=${pst.url}>
                            <img src=${pst.imageUrl}>
                        </a>
                    </div>
                    <div class="post-content">
                        <div class="title">
                            <a href=${pst.url}>
                                ${pst.title}
                            </a>
                        </div>
                        <div class="details">
                            <div class="info">
                                submitted ${calcTime(pst.createdAt)} ago by ${pst.author}
                            </div>
                            <div class="controls">
                                <ul>
                                    <li class="action"><a class="commentsLink" href="/details/${pst.postId}">comments</a></li>
                                    ${isAuth.id === pst.creator
                    ? html`<li class="action"><a class="editLink" href="/edit/${pst.postId}">edit</a></li>
                                    <li class="action"><a @click=${() => onDelete(pst.postId)} class="deleteLink" href="#">delete</a></li>`
                    : null
                }
                                    
                                </ul >
                            </div >

                        </div >
                    </div >
                </article > `)
            : html`< h3 > No posts in database</h3 > `
        }`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    if (isAuth) {
        let data = [];

        async function onDelete(id) {
            const choice = confirm('Are you sure?');

            if (choice) {
                try {
                    await del(`/app/post/${id}`);
                    ctx.page.redirect('/');
                } catch (err) {
                    if (err.message) alert(err.message);
                    else alert(err);
                }
            }
        }

        try {
            data = await get("/app");
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }

        return ctx.render(dashboard({ onDelete, data, isAuth }));
    } else {
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('register-username');
            const password = formData.get('register-password');
            const repass = formData.get('repeatPass');

            if (username === '' || password === '') return alert('All fields are required');
            if (password !== repass) return alert("Passwords don't match");

            try {
                const user = await post("/auth/register", { username, password });

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

        async function onLogin(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('login-username');
            const password = formData.get('login-password');

            if (username.trim() === '' || password.trim() === '') return alert('All fields are required!');

            try {
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

        try {
            const user = await get("/");

            if (399 < user.status) throw user.statusText;

            console.log(user);
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }

        return ctx.render(welcome({ onLogin, onRegister }));
    }
}