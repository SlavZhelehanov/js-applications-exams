import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template({item, onDelete, isOwner}) {
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
                            ? html`<a href="/edit/${item._id}" class="meme-details-button">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="meme-details-button">Delete</a>`
                            : null
                    }
                </div>

            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                showMessage("loadingBox", "Loading...");
                await del(`/data/memes/${id}`);
                await showMessage("infoBox", "Meme deleted.");
                ctx.page.redirect('/app');
            } catch (err) {
                if (err.message) showMessage("errorBox", err.message);
                else showMessage("errorBox", err);
            }
        }
    }

    try {
        item = await get(`/data/memes/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({onDelete, isOwner, item}));
}