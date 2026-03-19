import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData, showMessage } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <div id="register">
            <form @submit=${onRegister}>
                <div class="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <button type="submit" class="registerbtn">Register</button>
                </div>
                <div class="container signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.</p>
                </div>
            </form>
        </div> `;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repeatPass');

        // if (email === '' || password === '') return alert('All fields are required');
        if (/^[A-Za-z]{3,}$/.test(username)) return showMessage("errorBox", 'A username should be at least 3 characters long and should contain only english alphabet letters.');
        if (/^[A-Za-z]{6,}$/.test(password)) return showMessage("errorBox", 'A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits. ');
        if (password !== repass) return showMessage("errorBox", "Both passwords must match. ");

        try {
            showMessage("loadingBox", "Loading...");

            const user = await post("/users/register", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            await showMessage("infoBox", "User registration successful.");
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showMessage("errorBox", err.message);
            else showMessage("errorBox", err);
        }
    }

    ctx.render(template(onRegister));
}