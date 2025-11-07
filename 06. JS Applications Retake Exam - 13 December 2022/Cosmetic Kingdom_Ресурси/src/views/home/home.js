import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="home">
            <img src="./images/beauty-g0d19af267_1920-removebg.png" alt="home"/>
            <h2>Looking for the best beauty products?</h2>
            <h3>You are in the right place!</h3>
        </section>`;
}

export function homePage(ctx) {
    ctx.render(template());
}