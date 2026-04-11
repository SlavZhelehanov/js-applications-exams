import { html } from "../../lib/lit-html.min.js";
import { get, post, del } from "../../utils/api.js";
import { saveUserData, showMessage } from "../../utils/utils.js";

function main({ onRegister, onLogin }) {
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
            <div class="welcome-login-forms">
                <div class="welcome-login-form">
                    <h1>Sign in</h1>
                    <form id="login-form" method="POST" @submit=${onLogin}>
                        <label for="username-login">Username</label>
                        <input type="text" name="username-login" id="username-login" placeholder="Username">
                        <label for="password-login">Password</label>
                        <input type="password" name="password-login" id="password-login" placeholder="Password">
                        <input id="loginBtn" type="submit" value="Login"/>
                    </form>
                </div>
                <div class="welcome-rigister-form">
                    <h1>Register</h1>
                    <form id="register-form" method="POST" @submit=${onRegister}>
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

function dashboard({ data, onDelete, onCreate, onCheckout, total }) {
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
${0 < data.length
            ? data.map(r => html`<div class="row">
                        <div class="col wide">${r.productName}</div>
                        <div class="col wide">${r.quantity}</div>
                        <div class="col wide">${r.price}</div>
                        <div class="col">${r.quantity * r.price}</div>
                        <div class="col right">
                            <a @click=${() => onDelete(r._id)} href="javascript:void(0)">&#10006;</a>
                        </div>
                    </div>`)
            : null
        }
                </div>
                <div class="row">
                    <form id="create-entry-form" method="post" @submit=${onCreate}>
                        <div class="col wide">
                            <input name="type" placeholder="Product name">
                        </div>
                        <div class="col wide">
                            <input type="number" name="qty" placeholder="Quantity">
                        </div>
                        <div class="col wide">
                            <input type="number" name="price" placeholder="Price per Unit">
                        </div>
                        <div class="col">Sub-total</div>
                        <div class="col">
                            <input id="addItemBtn" type="submit" value="Add"/>
                        </div>
                    </form>
                </div>
                <div class="table-foot">
                    <form id="create-receipt-form" method="post" @submit=${onCheckout}>
                        <div class="col wide"></div>
                        <div class="col wide"></div>
                        <div class="col wide right">Total:</div>
                        <div class="col">${total.toFixed(2)}</div>
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

            if (username === '' || password === '') return showMessage('errorBox', 'All fields are required');
            if (password !== repass) return showMessage('errorBox', "Passwords don't match");

            try {
                showMessage('loadingBox', 'Loading...');
                const user = await post("/users/register", { username, password });

                if (399 < user.status) throw user.statusText;

                saveUserData(user);
                await showMessage('infoBox', 'User registration successful');
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) showMessage('errorBox', err.message);
                else showMessage('errorBox', err);
            }
        }

        async function onLogin(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username-login');
            const password = formData.get('password-login');

            if (username.trim() === '' || password.trim() === '') return showMessage('errorBox', 'All fields are required!');

            try {
                showMessage('loadingBox', 'Loading...');
                const user = await post("/users/login", { username, password });

                if (399 < user.status) throw user.statusText;

                saveUserData(user);
                await showMessage('infoBox', 'Login successful');
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) showMessage('errorBox', err.message);
                else showMessage('errorBox', err);
            }
        }

        return ctx.render(main({ onRegister, onLogin }));
    }

    function getCurrentFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    let data = [], total = 0;

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            productName: formData.get('type').trim(),
            quantity: Number(formData.get('qty').trim()),
            price: Number(formData.get('price').trim())
        }

        if (Object.values(item).some((x) => !x)) return showMessage('errorBox', "All fields are required!");

        try {
            showMessage('loadingBox', 'Loading...');
            await post("/jsonstore/products", item);
            await showMessage('infoBox', 'Entry added');
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            showMessage('errorBox', err.message);
        }
    }

    async function onCheckout(e) {
        e.preventDefault();
        let items = 0;

        if (data.length === 0) return;

        data.forEach(pr => items += pr.quantity);
        try {
            showMessage('loadingBox', 'Loading...');
            await post("/jsonstore/receipts", { data, total, items, creationDate: getCurrentFormattedDate() });
            await showMessage('infoBox', "Receipt checked out");
            for (let i = 0; i < data.length; i++) await del(`/jsonstore/products/${data[i]._id}`);

            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            showMessage('errorBox', err.message);
        }
    }

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                showMessage('loadingBox', 'Loading...');
                await del(`/jsonstore/products/${id}`);
                await showMessage('infoBox', 'Entry removed');
                ctx.page.redirect('/');
            } catch (err) {
                showMessage('errorBox', err.message);
            }
        }
    }

    try {
        showMessage('loadingBox', 'Loading...');
        const res = await get("/jsonstore/products?sortBy=_createdOn%20desc");
        showMessage('', 'Loading...');
        Object.keys(res).forEach(k => data.push(res[k]));

        data.forEach(el => total += (el.quantity * el.price));
    } catch (err) {
        if (err.message) showMessage(err.message);
        else showMessage('errorBox', err);
    }

    return ctx.render(dashboard({ onCheckout, data, onCreate, total, onDelete }));
}