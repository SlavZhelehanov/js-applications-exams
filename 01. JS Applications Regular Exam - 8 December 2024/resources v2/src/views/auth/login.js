import {html} from '../../lib/lit-html.min.js';
import {loginUser} from "../../services/authService.js";
import {notify} from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form class="login-form" @submit=${onLogin}>
                    <input type="text" name="email" id="email" placeholder="email"/>
                    <input type="password" name="password" id="password" placeholder="password"/>
                    <button type="submit">login</button>
                    <p class="message">
                        Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
    `
}

export async function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if (email.trim() === '' || password.trim() === '') throw new Error('All fields are required!');

            await loginUser(email, password);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) notify(err.message);
            else notify(err);
        }
    }

    ctx.render(template(onLogin));
}