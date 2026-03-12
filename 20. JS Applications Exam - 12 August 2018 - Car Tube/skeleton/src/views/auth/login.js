import {html} from '../../lib/lit-html.min.js';
import {post} from "../../utils/api.js";
import {saveUserData} from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <div id="login">
            <form @submit=${onLogin}>
                <div class="container">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <button type="submit" class="registerbtn">Login</button>
                </div>

                <div class="container signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.</p>
                </div>
            </form>
        </div>`;
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username.trim() === '' || password.trim() === '') return alert('All fields are required!');
        if (/^[A-Za-z]{3,}$/.test(username)) return alert('A username should be at least 3 characters long and should contain only english alphabet letters.');
        if (/^[A-Za-z]{6,}$/.test(password)) return alert('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits. ');

        try {
            const user = await post("/users/login", {username, password});

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            await alert("Login successful.");
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    ctx.render(template(onLogin));
}