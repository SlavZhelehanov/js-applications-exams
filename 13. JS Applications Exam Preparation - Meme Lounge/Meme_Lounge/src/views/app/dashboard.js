import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { showError } from "../../utils/utils.js";

function template(data) {
    return html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				${0 < data.length
            ? data.map(m => html`<div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${m.title}</p>
                            <img class="meme-image" alt="meme-img" src=${m.imageUrl}>
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${m._id}">Details</a>
                        </div>
                    </div>
                </div>`)
            : html`<p class="no-memes">No memes in database.</p>`
        }				
			</div>
        </section>
    `;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get('/data/memes?sortBy=_createdOn%20desc');
    } catch (err) {
        showError(err.message);
    }

    ctx.render(template(data));
}