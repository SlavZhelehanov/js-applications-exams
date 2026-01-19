import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData, showMessage } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <section id="registerView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>Register</h1>
                    <form @submit=${onRegister}>
                        <div class="form-group">
                            <label for="username" class="white-labels">Username</label>
                            <input type="text" name="username" class="form-control" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label for="password" class="white-labels">Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                    <h4 class="mt-3 text-white">Already have an account? <a href="/login" class="add-link">Login</a></h4>
                </div>
            </div>
        </section>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username.length < 3) return showMessage( "err",'The username should be at least 3 characters long');
        if (password.length < 6) return showMessage( "err",'The password should be at least 6 characters long');

        try {
            showMessage("loading", 'Loading...');
            const user = await post("/users/register", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            await showMessage("info", 'User registration successful.');
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/app');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    ctx.render(template(onRegister));
}