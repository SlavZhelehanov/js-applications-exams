import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData, showError, showInfo, showLoading } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <section id="viewRegister" @submit=${onRegister}>
            <h1>Please register here</h1>
            <form id="formRegister">
                <label>
                    <div>Username:</div>
                    <input type="text" name="username" id="registerUsername" required />
                </label>
                <label>
                    <div>Password:</div>
                    <input type="password" name="password" id="registerPasswd" required />
                </label>
                <label>
                    <div>Name:</div>
                    <input type="text" name="name" id="registerName" />
                </label>
                <div>
                    <input type="submit" value="Register" />
                </div>
            </form>
        </section>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const name = formData.get('name');

        if (username === '' || password === '' || name === '') return showError('All fields are required');
        // if (password !== repass) return alert("Passwords don't match");

        try {
            showLoading();
            const user = await post("/auth/register", { username, password, name });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            showInfo("User registration successful.");
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showError(err.message);
            else showError(err);
        }
    }

    ctx.render(template(onRegister));
}