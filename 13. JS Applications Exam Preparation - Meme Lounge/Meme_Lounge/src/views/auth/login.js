import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData, showError } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section id="login">
            <form id="login-form" @submit=${onLogin}>
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>`
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.trim() === '' || password.trim() === '') return showError('All fields are required!');

        try {
            const user = await post("/users/login", { email, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/app');
        } catch (err) {
            showError(err);
        }
    }

    ctx.render(template(onLogin));
}