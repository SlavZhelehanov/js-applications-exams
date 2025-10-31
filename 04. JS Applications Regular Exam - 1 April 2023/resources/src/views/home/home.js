import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="home">
            <h1>Learn more about your favorite fruits</h1>
            <img src="./images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png" alt="home"/>
        </section>`;
}

export function homePage(ctx) {
    ctx.render(template());
}