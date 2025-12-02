import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(items) {
    return html`
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                ${0 < items.length
                        ? items.map(i => html`
                        <div class="animals-board">
                            <article class="service-img">
                                <img class="animal-image-cover" src=${i.image}>
                            </article>
                            <h2 class="name">${i.name}</h2>
                            <h3 class="breed">${i.breed}</h3>
                            <div class="action">
                                <a class="btn" href="/details/${i._id}">Details</a>
                            </div>
                        </div>`)
                        : html`<div><p class="no-pets">No pets in dashboard</p></div>`
                }
            </div>
        </section>
    `;
}

export async function dashboardPage(ctx) {
    let items = [];

    try {
        items = await get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(items));
}