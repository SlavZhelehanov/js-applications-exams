import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";

function template(products) {
    return html`
        <h2>Products</h2>
        ${0 < products.length
                ? html`<section id="dashboard">
            ${products.map(p => html`<div class="product">
                    <img src=${p.imageUrl} alt="example1"/>
                    <p class="title">${p.name}</p>
                    <p><strong>Price:</strong><span class="price">${p.price}</span>$</p>
                    <a class="details-btn" href="/details/${p._id}">Details</a>
                </div>`)}
        </section>`
                : html`<h2>No products yet.</h2>`}
    `;
}

export async function dashboardPage(ctx) {
    let products = [];

    try {
        products = await get("/data/products?sortBy=_createdOn%20desc");
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(products));
}