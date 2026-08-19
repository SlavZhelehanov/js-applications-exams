import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <div class="container auth">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>
                    <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                        It increases by diffusion and grows by dispersion.</blockquote>
                    <p class="field email">
                        <input type="email" id="email" name="email" placeholder="maria@email.com">
                        <label for="email">Email:</label>
                    </p>
                    <p class="field username">
                        <input type="text" id="username" name="username" placeholder="Username...">
                        <label for="username">Username:</label>
                    </p>
                    <p class="field password">
                        <input type="password" name="password" id="register-pass">
                        <label for="register-pass">Password:</label>
                    </p>
                    <p class="field password">
                        <input type="password" name="rep-pass" id="rep-pass">
                        <label for="rep-pass">Repeat password:</label>
                    </p>
                    <p class="field submit">
                        <button class="btn submit" type="submit">Register</button>
                    </p>
                    <p class="field">
                        <span>If you already have profile click <a href="/">here</a></span>
                    </p>
                </fieldset>
            </form>
        </div>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('rep-pass').trim();
        const username = formData.get('username').trim();

        if (email === '' || password === '' || username === '') return alert('All fields are required!');
        if (repass !== password) return alert('Passwords must match!');

        try {
            const user = await post("/auth/register", { email, password, repass, username });

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