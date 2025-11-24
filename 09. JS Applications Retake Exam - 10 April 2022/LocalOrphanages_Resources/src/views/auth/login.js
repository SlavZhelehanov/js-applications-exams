import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="login-page" class="auth">
            <form id="login">
                <h1 class="title">Login</h1>

                <article class="input-group">
                    <label for="login-email">Email: </label>
                    <input type="email" id="login-email" name="email">
                </article>

                <article class="input-group">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password">
                </article>

                <input type="submit" class="btn submit-btn" value="Log In">
            </form>
        </section>`
}

export function loginPage(ctx) {
    ctx.render(template());
}