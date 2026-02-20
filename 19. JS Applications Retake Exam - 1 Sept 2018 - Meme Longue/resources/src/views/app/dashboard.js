import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
    return html`
        <div id="meme-feed">
            <h1>Meme Feed</h1>
            <div id="memes">
                ${0 < data.length
                        ? data.map(m => html`<div class="meme">
                    <a href="#" class="meme-title">${m.title}</a>
                    <br>
                    <a href="#"><img class="meme-image" src=${m.imageUrl}></a>
                    <div class="info">
                        <div id="data-buttons">
                            <a href="#" class="custom-button">Check Out</a>
                            <a href="/edit/${m._id}" class="custom-button">Edit</a>
                            <a href="#" class="custom-button">Delete</a>
                            <a href="#" class="creator">Creator: ${m.creator}</a>
                        </div>
                    </div>
                    <hr>
                </div>`)
                        : html`<p class="no-memes">No memes in database.</p>`
                }
            </div>
        </div>`;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get('/data/memes?sortBy=_createdOn%20desc');
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}