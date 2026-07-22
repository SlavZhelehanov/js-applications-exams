import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData, showError, showInfo, showLoading } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section id="viewLogin">
            <h1>Please login</h1>
            <form id="formLogin" @submit=${onLogin}>
                <label>
                    <div>Username:</div>
                    <input type="text" name="username" id="loginUsername" required />
                </label>
                <label>
                    <div>Password:</div>
                    <input type="password" name="password" id="loginPasswd" required />
                </label>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </section>`;
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            showLoading();
            const user = await post("/auth/login", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            showInfo("Login successful.");
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showError(err.message);
            else showError(err);
        }
    }

    ctx.render(template(onLogin));
}
