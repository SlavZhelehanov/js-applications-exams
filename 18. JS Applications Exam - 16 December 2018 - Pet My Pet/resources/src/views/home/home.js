import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section class="basic">
            <h1> Welcome to pet my pet!</h1>
        </section>`;
}

export async function homePage(ctx) {
    ctx.render(template());
}