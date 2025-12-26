import {html} from '../../lib/lit-html.min.js';
import {post} from "../../utils/api.js";
import {saveUserData} from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section id="loginPage">
            <form @submit=${onLogin}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            const user = await post("/users/login", {email, password});

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