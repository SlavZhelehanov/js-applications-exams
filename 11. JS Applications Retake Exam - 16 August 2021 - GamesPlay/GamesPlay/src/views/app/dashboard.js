import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
    return html`
        <section id="catalog-page">
            <h1>All Games</h1>
            ${0 < data.length
            ? data.map(g => html`<div class="allGames">
                <div class="allGames-info">
                    <img src=${g.imageUrl}>
                    <h6>${g.category}</h6>
                    <h2>${g.title}</h2>
                    <a href="/details/${g._id}" class="details-button">Details</a>
                </div>
            </div>`
            )
            : html`<h3 class="no-articles">No articles yet</h3>`
        }
        </section>
    `;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get("/data/games?sortBy=_createdOn%20desc");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}