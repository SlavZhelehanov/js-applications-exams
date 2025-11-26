import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";

function template(item, onEdit) {
    return html`
        <section id="edit-page" class="auth">
            <form id="edit" @submit=${onEdit}>
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" value=${item.title}>
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" value=${item.description}>
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" value=${item.imageUrl}>
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" value=${item.address}>
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" value=${item.phone}>
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
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
            imageUrl: formData.get('imageUrl').trim(),
            address: formData.get('address').trim(),
            phone: formData.get('phone').trim()
        }

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        try {
            await put(`/data/posts/${id}`, newItem);
            e.target.reset();
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        item = await get(`/data/posts/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, onEdit));
}