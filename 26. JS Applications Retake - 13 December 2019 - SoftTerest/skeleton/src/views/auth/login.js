import { html } from '../../lib/lit-html.min.js';
import { post } from "../../utils/api.js";
import { saveUserData, showError, showInfo, showLoading } from "../../utils/utils.js";

function template(onLogin) {
    return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class="row-form d-md-flex flex-mb-equal ">
                <div class="col-md-4">
                    <img class="responsive" src="./images/idea.png" alt="">
                </div>
                <form class="form-user col-md-7" method="post" @submit=${onLogin}>
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                    </div>
                    <div class="form-label-group">
                        <label for="inputUsername">Username</label>
                        <input type="text" id="inputUsername" name="username" class="form-control"
                            placeholder="Username" required="" autofocus="">
                    </div>
                    <div class="form-label-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" id="inputPassword" name="password" class="form-control"
                            placeholder="Password" required="">
                    </div>
                    <div class="text-center mb-4 text-center">
                        <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                        <p class="alreadyUser"> Don't have account? Then just
                            <a href="/register">Sign-Up</a>!
                        </p>
                    </div>
                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
                </form>
            </div>
        </div>`;
}

export function loginPage(ctx) {
    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username.trim() === '' || password.trim() === '') return showError('All fields are required!');

        try {
            showLoading();
            const user = await post("/auth/login", { username, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            showInfo("Login successful.");
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showError(err.message);
            else showError(err);
        }
    }

    ctx.render(template(onLogin));
}
