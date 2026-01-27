import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData, showMessage } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section class="login">
            <form @submit=${onLogin}>
                <fieldset>
                    <legend>Login</legend>
                    <p class="field">
                        <label for="username">Username</label>
                        <span class="input">
                                <input type="text" name="username" id="username" placeholder="Username"/>
                                <span class="actions"></span>
                                <i class="fas fa-user"></i>
                            </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                                <input type="password" name="password" id="password" placeholder="Password"/>
                                <span class="actions"></span>
                                <i class="fas fa-key"></i>
                            </span>
                    </p>
                    <input class="button" type="submit" class="submit" value="Login"/>
                </fieldset>
            </form>
        </section>`;
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username.trim() === '' || password.trim() === '') return showMessage("err",'All fields are required!');

        try {
            const user = await post("/users/login", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            await showMessage("info", 'Login successful.');
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    ctx.render(template(onLogin));
}