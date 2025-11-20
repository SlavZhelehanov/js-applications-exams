import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";

function template(offers) {
    return html`
        <section id="dashboard">
            <h2>Job Offers</h2>

            ${0 < offers.length
                    ? offers.map(o => html`
                        <div class="offer">
                            <img src="${o.imageUrl}" alt="example1"/>
                            <p>
                                <strong>Title: </strong><span class="title">${o.title}</span>
                            </p>
                            <p><strong>Salary:</strong><span class="salary">${o.salary}</span></p>
                            <a class="details-btn" href="/details/${o._id}">Details</a>
                        </div>`)
                    : html`<h2>No offers yet.</h2>`
            }
        </section>
    `;
}

export async function dashboardPage(ctx) {
    let offers = [];

    try {
        offers = await get("/data/offers?sortBy=_createdOn%20desc");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(offers));
}