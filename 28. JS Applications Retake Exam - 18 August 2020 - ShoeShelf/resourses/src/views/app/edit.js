import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";

function template({ onEdit, item }) {
    return html`
        <h1>Edit Offer</h1>
        <p class="message"></p>
        <form @submit=${onEdit}>
            <div>
                <input type="text" name="name" value=${item.name} placeholder="Name...">
            </div>
            <div>
                <input type="number" name="price" value=${item.price} placeholder="Price...">
            </div>
            <div>
                <input type="url" name="imageUrl" value=${item.imageUrl} placeholder="Image url...">
            </div>
            <div>
                <textarea name="description" placeholder="Give us some description about this offer...">${item.description}</textarea>
            </div>
            <div>
                <input type="text" name="brand" value=${item.brand} placeholder="Brand...">
            </div>
            <div>
                <button type="submit">Edit</button>
            </div>
        </form>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = {
            name: formData.get('name').trim(),
            price: formData.get('price').trim(),
            description: formData.get('description').trim(),
            brand: formData.get('brand').trim(),
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