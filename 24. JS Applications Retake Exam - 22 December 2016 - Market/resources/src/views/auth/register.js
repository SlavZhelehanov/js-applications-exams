import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onSubmit) {
    return html`
        <section id="viewRegister">
                <h1>Please register here</h1>
                <form id="formRegister" @submit=${onSubmit}>
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
                        <input type="name" name="name" id="registerName" />
                    </label>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </section>`;
}

export async function registerPage(ctx) {
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const name = formData.get('name');

        if (!username.trim() || !password.trim() || !name.trim()) return alert('All fields are required');

        try {
            const user = await post('/auth/register', { username, password, name });
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