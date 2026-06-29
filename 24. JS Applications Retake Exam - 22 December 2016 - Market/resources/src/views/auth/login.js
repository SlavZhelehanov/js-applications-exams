import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onSubmit) {
    return html`
        <section id="viewLogin">
                <h1>Please login</h1>
                <form id="formLogin" @submit=${onSubmit}>
                    <label>
                        <div>Username:</div>
                        <input type="text" name="username" id="loginUsername" required />
                    </label>
                    <label>
                        <div>Password:</div>
                        <input type="password" name="password" id="loginPasswd" required />
                    </label>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </section>`;
}

export async function loginPage(ctx) {
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username.trim() || !password.trim()) return alert('All fields are required');

        try {
            const user = await post('/auth/login', { username, password });
            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else console.log(err);
        }
    }

    return ctx.render(template(onSubmit));
}