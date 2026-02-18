import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template({item, isOwner}) {
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
                    ${isOwner
                            ? html`<a href="#" class="meme-details-button">Edit</a>
                            <a href="#" class="meme-details-button">Delete</a>`
                            : null
                    }
                </div>

            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false;

    try {
        item = await get(`/data/memes/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({isOwner, item}));
}