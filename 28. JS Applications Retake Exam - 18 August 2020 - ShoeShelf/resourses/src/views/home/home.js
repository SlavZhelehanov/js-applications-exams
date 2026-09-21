import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { getUserData } from "../../utils/utils.js";

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

function dashboard(data) {
    return html`<div class="shoes">
            ${data.length === 0
                ? html`<h1>No shoes to display. Be the first to create a new offer...</h1>`
                : data.map(shoe => html`<div class="shoe">
                <img src=${shoe.imageUrl}>
                <h3>${shoe.brand} ${shoe.name}</h3>
                <a>Buy it for $${shoe.price}</a>
            </div>`)
            }
        </div>`;
}

export async function homePage(ctx) {
    const userData = getUserData();
    let data = [];
    
    if(userData) {
        data = await get(`/app`);
        return ctx.render(dashboard(data));
    }
    
    ctx.render(template());
}