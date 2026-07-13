import { html } from "../../lib/lit-html.min.js";
import { getUserData } from "../../utils/utils.js";

function template() {
    return html`
        <section id="viewAppHome">
            <h1>Welcome</h1>
            Welcome to our messaging system.
        </section>`;
}

function dashboard() {
    return html`
        <section id="viewUserHome">
            <h1 id="viewUserHomeHeading">Welcome, {user}!</h1>
            <a href="/me-messages" id="linkUserHomeMyMessages">My Messages</a>
            <a href="/send" id="linkUserHomeSendMessage">Send Message</a>
            <a href="/archive" id="linkUserHomeArchiveSent">Archive (Sent)</a>
        </section>`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    if (isAuth) {
        ctx.render(dashboard());
    } else {
        ctx.render(template());
    }
}