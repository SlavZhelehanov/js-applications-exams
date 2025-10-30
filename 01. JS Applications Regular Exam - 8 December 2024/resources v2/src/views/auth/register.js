import {html} from '../../lib/lit-html.min.js';
import {registerUser} from "../../services/authService.js";
import {notify} from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <section id="register">
            <div class="form">
                <h2>Register</h2>
                <form class="register-form" @submit=${onRegister}>
                    <input type="text" name="email" id="register-email" placeholder="email"/>
                    <input type="password" name="password" id="register-password" placeholder="password"/>
                    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
                    <button type="submit">register</button>
                    <p class="message">Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </section>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('re-password');

        try {
            if (email === '' || password === '') throw new Error('All fields are required');
            if (password !== repass) throw new Error("Passwords don't match");

            await registerUser(email, password);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) notify(err.message);
            else notify(err);
        }
    }

    ctx.render(template(onRegister));
}