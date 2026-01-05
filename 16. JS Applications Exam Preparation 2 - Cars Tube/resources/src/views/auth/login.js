import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <section id="login">
            <div class="container">
                <form id="login-form"  @submit=${onLogin}>
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
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

        if (username.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            const user = await post("/users/login", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/app');
        } catch (err) {
            alert(err);
        }
    }

    ctx.render(template(onLogin));
}