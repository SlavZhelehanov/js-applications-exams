import { html } from "../../lib/lit-html.min.js";

function register() {
    return html`
        <section id="viewRegister">
        <div class="content">
            <form class="form" id="formRegister">
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <label>Repeat Password</label>
                <input name="repeatPass" type="password">
                <input id="btnRegister" value="Register" type="submit">
                <a href="#">Log in</a>
            </form>
        </div>
    </section>`;
}

export async function homePage(ctx) {
    ctx.render(register());
}