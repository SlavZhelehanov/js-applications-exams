import { html } from '../../../node_modules/lit-html/lit-html.js';
import {login} from '../../services/authService.js';

function template(onLogin) {
    return html`
        <section id="login">
            <div class="form">
                <img class="border" src="./images/border.png" alt=""/>
                <h2>Login</h2>
                <form class="login-form" @submit=${onLogin}>
                    <input type="text" name="email" id="email" placeholder="email"/>
                    <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                    />
                    <button type="submit">login</button>
                    <p class="message">
                        Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
    `
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            await login(email, password);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err);
        }
    }

    ctx.render(template(onLogin));
}