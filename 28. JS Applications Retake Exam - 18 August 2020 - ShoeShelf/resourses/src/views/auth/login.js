import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <h1>Login</h1>
        <p class="form-info">Don't have account?
            <a href="/register">Register now</a> and fix that!
        </p>
        <form @submit=${onLogin}>
            <div>
                <input type="email" name="email" placeholder="Email...">
            </div>

            <div>
                <input type="password" name="password" placeholder="Password...">
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>`
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            const user = await post("/auth/login", { email, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err);
        }
    }

    ctx.render(template(onLogin));
}