import { html } from "../../lib/lit-html.min.js";
import { getUserData } from "../../utils/utils.js";

function welcome() {
    return html`
        <section id="viewAppHome">
                <h1>Welcome</h1>
                Welcome to our shopping system.
            </section>`;
}

function dashboard({isAuth}) {
    return html`
        <section id="viewUserHome">
                <h1 id="viewUserHomeHeading">Welcome, ${isAuth.username}!</h1>
                <a href="/shop" id="linkUserHomeShop">Shop</a>
                <a href="/cart" id="linkUserHomeCart">Cart</a>
            </section>`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    if (isAuth) {
        return ctx.render(dashboard({isAuth}));
    }
    return ctx.render(welcome());
}