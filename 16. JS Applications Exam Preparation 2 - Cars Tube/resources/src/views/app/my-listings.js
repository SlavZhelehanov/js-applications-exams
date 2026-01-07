import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(data) {
    return html`
        <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${0 < data.length
                        ? data.map(s => html`<div class="listing">
                    <div class="preview">
                        <img src=${s.imageUrl}>
                    </div>
                    <h2>${s.brand} ${s.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${s.year}</h3>
                            <h3>Price: ${s.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${s._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>`)
                        : html`<p class="no-cars"> You haven't listed any cars yet.</p>`
                }
            </div>
        </section>`;
}

export async function myListingsPage(ctx) {
    let data = [];

    try {
        data = await get(`/data/cars?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc2`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}