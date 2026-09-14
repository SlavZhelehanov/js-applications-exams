import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <h1>Register</h1>
        <p class="form-info">Already registered?
            <a href="/login">Login now</a> and have some fun!
        </p>

        <form @submit=${onRegister}>
            <div>
                <input type="email" name="email" placeholder="Email...">
            </div>
            <div>
                <input type="username" name="username" placeholder="Username...">
            </div>
            <div>
                <input type="password" name="password" placeholder="Password">
            </div>
            <div>
                <input type="password" name="repeatPassword" placeholder="Re-password">
            </div>
            <div>
                <p class="message"></p>
                <button type="submit">Register</button>
            </div>
        </form>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repeatPassword');

        if (email === '' || password === '') return alert('All fields are required');
        if (password !== repass) return alert("Passwords don't match");

        try {
            const user = await post("/auth/register", { username, email, password, repass });

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

    ctx.render(template(onRegister));
}