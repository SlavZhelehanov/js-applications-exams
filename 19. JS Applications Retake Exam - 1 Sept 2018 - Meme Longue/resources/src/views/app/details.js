import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template({item}) {
    return html`
        <div class="meme-details">
            <div class="my-meme-details">
                <a href="#" id="meme-title">${item.title}</a>
                <img src=${item.imageUrl}>
                <div class="meme-props">
                    <h2>Description</h2>
                    <p class="meme-description">${item.description}</p>
                </div>

                <div class="meme-details-buttons">
                    <a class="meme-details-button" href="#">Created by ${item.creator}</a>
                    <a href="#" class="meme-details-button">Edit</a>
                    <a href="#" class="meme-details-button">Delete</a>
                </div>

            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    try {
        item = await get(`/data/memes/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({item}));
}