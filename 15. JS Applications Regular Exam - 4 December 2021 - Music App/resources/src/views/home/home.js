import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="welcomePage">
            <div id="welcome-message">
                <h1>Welcome to</h1>
                <h1>My Music Application!</h1>
            </div>

            <div class="music-img">
                <img src="./images/musicIcons.webp" alt="">
            </div>
        </section>`;
}

export async function homePage(ctx) {
    ctx.render(template());
}