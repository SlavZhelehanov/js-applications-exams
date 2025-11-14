import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";

function template(shoes) {
    return html`
        <section id="dashboard">
            <h2>Collectibles</h2>
            ${0 < shoes.length 
                    ? html`<ul class="card-wrapper">
                        ${shoes.map(s => html`<li class="card">
                            <img src=${s.imageUrl} alt="travis"/>
                            <p>
                                <strong>Brand: </strong><span class="brand">${s.brand}</span>
                            </p>
                            <p>
                                <strong>Model: </strong><span class="model">${s.model}</span>
                            </p>
                            <p><strong>Value:</strong><span class="value">${s.value}</span>$</p>
                            <a class="details-btn" href="/details/${s._id}">Details</a>
                        </li>`)}
                    </ul>` 
                    : html`<h2>There are no items added yet.</h2>`}
        </section>
    `;
}

export async function dashboardPage(ctx) {
    let shoes = [];

    try {
        shoes = await get("/data/shoes?sortBy=_createdOn%20desc");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(shoes));
}