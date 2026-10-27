import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";

function template({ onEdit, item }) {
    return html`<form class="text-center border border-light p-5" @submit=${onEdit} method="post">
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Movie Title" value=${item.title} name="title">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Movie Description..." name="description">${item.description}</textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" value=${item.imageUrl} name="imageUrl">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`;
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

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        await put(`/app/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/${id}/details`);
    }

    try {
        item = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message || err);
    }

    ctx.render(template({ item, onEdit }));
}