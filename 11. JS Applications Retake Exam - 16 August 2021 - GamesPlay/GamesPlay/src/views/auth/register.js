import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";
import {saveUserData} from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <section id="register-page" class="content auth">
            <form id="register" @submit=${onRegister}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('confirm-password');

        if (email === '' || password === '') return alert('All fields are required');
        if (password !== repass) return alert("Passwords don't match");

        try {
            const user = await post("/users/register", {email, password});

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if(err.message) alert(err.message);
            else alert(err);
        }
    }

    ctx.render(template(onRegister));
}