import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <form class="text-center border border-light p-5" action="#" method="post">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" placeholder="Username" name="username" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>
            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword"
                    value="">
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
        </form>`;
}

export function registerPage(ctx) {
    ctx.render(template());
}