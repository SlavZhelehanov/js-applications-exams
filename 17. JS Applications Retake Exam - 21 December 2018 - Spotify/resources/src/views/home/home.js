import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="homeView">
            <img class="m-auto background-image" width="100%" src="styles/spotify.jpg">
        </section>`;
}

export async function homePage(ctx) {
    ctx.render(template());
}