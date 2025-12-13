import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";
import { showError } from '../../utils/utils.js';

function template(item, onEdit) {
    return html`
        <section id="edit-meme">
            <form id="edit-form" @submit=${onEdit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value=${item.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">${item.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${item.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;
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

        if (Object.values(newItem).some((x) => !x)) return showError("All fields are required!");

        await put(`/data/memes/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/memes/${id}`);
    } catch (err) {
        showError(err.message);
    }

    ctx.render(template(item, onEdit));
}