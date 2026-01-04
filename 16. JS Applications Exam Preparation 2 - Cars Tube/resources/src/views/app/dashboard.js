import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
    return html`
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                ${0 < data.length
                        ? data.map(g => html`<div class="listing">
                    <div class="preview">
                        <img src=${g.imageUrl}>
                    </div>
                    <h2>${g.brand} ${g.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${g.year}</h3>
                            <h3>Price: ${g.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${g._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>`
                        )
                        : html`<p class="no-cars">No cars in database.</p>`
                }
            </div>
        </section>`;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get("/data/cars?sortBy=_createdOn%20desc");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}