import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <div id="login">
            <form action="#" method="post">
                <div class="container">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <button type="submit" class="registerbtn">Login</button>
                </div>

                <div class="container signin">
                    <p>Dont have an account?
                        <a href="#">Sign up</a>.</p>
                </div>
            </form>
        </div>`;
}

export function loginPage(ctx) {
    ctx.render(template());
}