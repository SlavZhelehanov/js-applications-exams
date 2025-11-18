import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form class="login-form">
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
        </section>`
}

export function loginPage(ctx) {
    ctx.render(template());
}