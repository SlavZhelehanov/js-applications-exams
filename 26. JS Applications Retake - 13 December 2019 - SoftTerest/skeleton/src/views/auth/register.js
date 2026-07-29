import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { saveUserData } from "../../utils/utils.js";

function template(onRegister) {
    return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class="row-form d-md-flex flex-mb-equal ">
                <div class="col-md-4">
                    <img class="responsive" src="./images/idea.png" alt="">
                </div>
                <form class="form-user col-md-7" method="post" @submit=${onRegister}>
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
                    <div class="form-label-group">
                        <label for="inputRepeatPassword">Repeat Password</label>
                        <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                            placeholder="Repeat Password" required="">
                    </div>
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
                    <div class="text-center mb-4">
                        <p class="alreadyUser"> Don't have account? Then just
                            <a href="">Sign-Up</a>!
                        </p>
                    </div>
                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
                </form>
            </div>
        </div>`;
}

export function registerPage(ctx) {
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repeatPassword');

        if (username === '' || password === '' || repass === '') return alert('All fields are required');
        if (password !== repass) return alert("Passwords don't match");

        try {
            const user = await post("/auth/register", { username, password, repass });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    ctx.render(template(onRegister));
}