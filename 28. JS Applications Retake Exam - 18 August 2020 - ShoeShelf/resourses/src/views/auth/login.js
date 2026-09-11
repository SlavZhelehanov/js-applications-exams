import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <h1>Login</h1>
        <p class="form-info">Don't have account?
            <a href="/register">Register now</a> and fix that!
        </p>
        <form action="">
            <div>
                <input type="email" placeholder="Email...">
            </div>

            <div>
                <input type="password" placeholder="Password...">
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>`
}

export function loginPage(ctx) {
    ctx.render(template());
}