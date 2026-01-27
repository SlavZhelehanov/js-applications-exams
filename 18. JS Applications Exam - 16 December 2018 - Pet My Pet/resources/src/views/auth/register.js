import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData, showMessage } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <section class="register">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>
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
                    <input class="button" type="submit" class="submit" value="Register"/>
                </fieldset>
            </form>
        </section>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username.length < 3) return showMessage( "err",'The username should be at least 3 symbols');
        if (password.length < 6) return showMessage( "err",'The password should be at least 6 symbols');

        try {
            showMessage("loading", 'Loading...');
            const user = await post("/users/register", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            await showMessage("info", 'User registration successful.');
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    ctx.render(template(onRegister));
}