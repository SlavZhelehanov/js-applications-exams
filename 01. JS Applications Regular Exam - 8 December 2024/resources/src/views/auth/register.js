import {html} from '../../../node_modules/lit-html/lit-html.js';
import {registerUser} from '../../services/authService.js';
import {createSubmitHandler} from '../../utils/utils.js';
import {notify} from '../partials/notifications.js';

function registerTemplate(onRegister) {
    return html`
        <section id="register">
            <div class="form">
                <h2>Register</h2>
                <form class="register-form" @submit=${onRegister}>
                    <input
                            type="text"
                            name="email"
                            id="register-email"
                            placeholder="email"
                    />
                    <input
                            type="password"
                            name="password"
                            id="register-password"
                            placeholder="password"
                    />
                    <input
                            type="password"
                            name="re-password"
                            id="repeat-password"
                            placeholder="repeat password"
                    />
                    <button type="submit">register</button>
                    <p class="message">Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </section>
    `;
}

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({email, password,['re-password']: repass}, form) {

        if (email === '' || password === '') {
            return notify('All fields are required');
        }

        if (password !== repass) {
            return notify("Passwords don't match");
        }

        await registerUser(email, password);
        form.reset();
        ctx.page.redirect('/');
    }
}