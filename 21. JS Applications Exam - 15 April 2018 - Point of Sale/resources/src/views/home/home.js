import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";
import {saveUserData} from "../../utils/utils.js";

function main({onRegister}) {
    return html`
        <section class="clearfix" id="welcome-section">
            <div class="welcome-text">
                <h1>What is Lorem Ipsum?</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled
                    it to make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                    Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus
                    PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="welcome-forms">
                <div class="welcome-login-form">
                    <h1>Sign in</h1>
                    <form id="login-form">
                        <label for="username-login">Username</label>
                        <input type="text" name="username-login" id="username-login" placeholder="Username">
                        <label for="password-login">Password</label>
                        <input type="password" name="password-login" id="password-login" placeholder="Password">
                        <input id="loginBtn" type="submit" value="Login"/>
                    </form>
                </div>
                <div class="welcome-rigister-form">
                    <h1>Register</h1>
                    <form id="register-form" @submit=${onRegister}>
                        <label for="username-register">Username</label>
                        <input type="text" name="username-register" id="username-register" placeholder="Username">
                        <label for="password-register">Password</label>
                        <input type="password" name="password-register" id="password-register" placeholder="Password">
                        <label for="password-register-check">Password check</label>
                        <input type="password" name="password-register-check" id="password-register-check"
                               placeholder="Repeat password">
                        <input id="registerBtn" type="submit" value="Register"/>
                    </form>
                </div>
            </div>
        </section>`;
}

function dashboard() {
    return html`
        <section id="create-receipt-view">
            <h1>Create Receipt</h1>
            <div class="table">
                <div class="table-head">
                    <div class="col wide">Product Name</div>
                    <div class="col wide">Quantity</div>
                    <div class="col wide">Price per Unit</div>
                    <div class="col">Sub-total</div>
                    <div class="col">Action</div>
                </div>
                <div id="active-entries">
                    <div class="row">
                        <div class="col wide">Apple</div>
                        <div class="col wide">10</div>
                        <div class="col wide">4.50</div>
                        <div class="col">45.00</div>
                        <div class="col right">
                            <a href="#">&#10006;</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col wide">Banana</div>
                        <div class="col wide">9</div>
                        <div class="col wide">3.50</div>
                        <div class="col">31.50</div>
                        <div class="col right">
                            <a href="#">&#10006;</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <form id="create-entry-form">
                        <div class="col wide">
                            <input name="type" placeholder="Product name">
                        </div>
                        <div class="col wide">
                            <input name="qty" placeholder="Quantity">
                        </div>
                        <div class="col wide">
                            <input name="price" placeholder="Price per Unit">
                        </div>
                        <div class="col">Sub-total</div>
                        <div class="col">
                            <input id="addItemBtn" type="submit" value="Add"/>
                        </div>
                    </form>
                </div>
                <div class="table-foot">
                    <form id="create-receipt-form">
                        <div class="col wide">
                        </div>
                        <div class="col wide">
                        </div>
                        <div class="col wide right">Total:</div>
                        <div class="col">76.50</div>
                        <div class="col">
                            <input id="checkoutBtn" type="submit" value="Checkout"/>
                        </div>
                        <input type="hidden" name="receiptId"/>
                        <input type="hidden" name="productCount"/>
                        <input type="hidden" name="total"/>
                    </form>
                </div>
            </div>
        </section>`;
}

export async function homePage(ctx) {
    const isAuth = !!ctx.userData;

    if (!isAuth) {
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username-register');
            const password = formData.get('password-register');
            const repass = formData.get('password-register-check');

            if (username === '' || password === '') return alert('All fields are required');
            if (password !== repass) return alert("Passwords don't match");

            try {
                const user = await post("/users/register", {username, password});

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

        return ctx.render(main({onRegister}));
    }

    return ctx.render(dashboard());
}