import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template(item, onEdit) {
    return html`
        <div id="edit-meme">
            <form @submit=${onEdit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <p>Please fill in this form to edit an meme.</p>

                    <p>Title</p>
                    <input type="text" placeholder="Enter Title" name="title" value=${item.title}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value=${item.description}>

                    <p>Meme Image</p>
                    <input type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${item.imageUrl}>

                    <button type="submit" class="registerbtn">Edit Meme</button>
                </div>
            </form>
        </div>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim()
        }

        if (Object.values(item).some((x) => !x)) return showMessage("errorBox", "All fields are required!");
        if (33 < item.title.length) return showMessage("errorBox", "The title length must not exceed 33 characters!");
        if (item.description.length < 30 || 450 < item.description.length) return showMessage("errorBox", "The description length must not exceed 450 characters and should be at least 30!");
        if (!item.imageUrl.startsWith("http://") && !item.imageUrl.startsWith("https://")) return showMessage("errorBox", "Link url should always start with “http”.");

        showMessage("loadingBox", "Loading...");
        await put(`/data/memes/${id}`, newItem);
        await showMessage("infoBox", `Meme ${newItem.title} updated`);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/memes/${id}`);
    } catch (err) {
        if (err.message) showMessage("errorBox", err.message);
        else showMessage("errorBox", err);
    }

    ctx.render(template(item, onEdit));
}