import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";

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

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/memes/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/memes/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, onEdit));
}