import { html } from '../../lib/lit-html.min.js';
import { get, del } from "../../utils/api.js";

function template(item, isOwner, onDelete) {
    return html`
        <section id="meme-details">
            <h1>Meme Title: ${item.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${item.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${item.description}</p>

                    ${isOwner
            ? html`<a class="button warning" href="/edit/${item._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>`
            : null}
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false;
    try {
        item = await get(`/data/memes/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        showError(err.message);
    }

    ctx.render(template(item, isOwner, onDelete));
}