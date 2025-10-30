import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="hero">
            <p>
                Discover the best deals on drones! Buy, sell, and trade top-quality drones with ease on Drone Deals -
                your
                trusted marketplace for all things drone.</p>
        </section>
    `
}

export function homePage(ctx) {
    ctx.render(template());
}