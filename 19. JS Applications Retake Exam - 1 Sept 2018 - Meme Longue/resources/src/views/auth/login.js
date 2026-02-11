import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <div id="login">
            <form  @submit=${onLogin}>
                <div class="container">
                    <h1>Login</h1>
                    <p id="details">Please enter your credentials.</p>
                    <hr id="login-register-hr">

                    <p id="username">Email</p>
                    <input placeholder="Enter Email" name="email" type="email">

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
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            const user = await post("/users/login", { email, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/app');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    ctx.render(template(onLogin));
}