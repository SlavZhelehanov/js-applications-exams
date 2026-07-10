import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="viewAppHome">
            <h1>Welcome</h1>
            Welcome to our messaging system.
        </section>`;
}

export async function homePage(ctx) {
    ctx.render(template());
}