import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData, showMessage } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section id="loginView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>Login</h1>
                    <form @submit=${onLogin}>
                        <div class="form-group">
                            <label for="username" class="white-labels">Username</label>
                            <input id="username" type="text" name="username" class="form-control" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label for="password" class="white-labels">Password</label>
                            <input id="password" type="password" name="password" class="form-control" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>

                    <h4 class="mt-3 text-white">No account yet? <a href="/register" class="add-link">Register</a></h4>
                </div>
            </div>
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
            ctx.page.redirect('/app');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    ctx.render(template(onLogin));
}