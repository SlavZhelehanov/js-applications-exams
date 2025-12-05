import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";

function template(item, onEdit) {
    return html`
        <section id="edit-page" class="auth">
            <form id="edit" @submit=${onEdit}>
                <div class="container">
                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value=${item.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value=${item.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value=${item.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value=${item.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${item.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">
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
            category: formData.get('category').trim(),
            maxLevel: formData.get('maxLevel').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            summary: formData.get('summary').trim()
        }

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/games/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/games/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, onEdit));
}