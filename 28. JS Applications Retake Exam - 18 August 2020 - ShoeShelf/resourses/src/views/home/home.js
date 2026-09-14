import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <div class="container">
            <div class="about-us">
                <div>
                    <img src="../public/shoes.jpg" alt="">
                    <img src="../public/shoes2.jpg" alt="">
                </div>
                <p>
                    <a href="/register">Register Now</a> and Try it!
                </p>
            </div>
        </div>`;
}

export function homePage(ctx) {
    ctx.render(template());
}