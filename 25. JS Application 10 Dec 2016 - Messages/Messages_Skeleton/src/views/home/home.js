import { html } from "../../lib/lit-html.min.js";
import { getUserData } from "../../utils/utils.js";

function template() {
    return html`
        <section id="viewAppHome">
            <h1>Welcome</h1>
            Welcome to our messaging system.
        </section>`;
}

function dashboard({ username }) {
    return html`
        <section id="viewUserHome">
            <h1 id="viewUserHomeHeading">Welcome, ${username}!</h1>
            <a href="/my-messages" id="linkUserHomeMyMessages">My Messages</a>
            <a href="/send" id="linkUserHomeSendMessage">Send Message</a>
            <a href="/archive" id="linkUserHomeArchiveSent">Archive (Sent)</a>
        </section>
        `;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    if (isAuth) {
        ctx.render(dashboard({ username: isAuth.user.username }));
    } else {
        ctx.render(template());
    }
}