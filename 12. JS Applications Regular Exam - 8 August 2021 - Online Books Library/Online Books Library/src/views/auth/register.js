import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";
import {saveUserData} from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <section id="register-page" class="register">
            <form id="register-form" @submit=${onRegister}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('confirm-pass');

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