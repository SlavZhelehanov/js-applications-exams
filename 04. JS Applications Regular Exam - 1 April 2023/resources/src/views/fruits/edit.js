import {html} from '../../lib/lit-html.min.js';
import {getById, updateFruit} from "../../services/fruitsService.js";

function template(fruit, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Fruit</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Fruit Name"
                            value=${fruit?.name}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="Fruit-image"
                            placeholder="Fruit Image URL"
                            value=${fruit?.imageUrl}
                    />
                    <textarea
                            id="fruit-description"
                            name="description"
                            placeholder="Description"
                            rows="10"
                            cols="50"
                    >${fruit?.description}</textarea>
                    <textarea
                            id="fruit-nutrition"
                            name="nutrition"
                            placeholder="Nutrition"
                            rows="10"
                            cols="50"
                    >${fruit?.nutrition}</textarea>
                    <button type="submit">post</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getById(id);

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newFruit = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            nutrition: formData.get('nutrition').trim()
        }

        if (Object.values(newFruit).some((x) => !x)) return alert("All fields are required!");

        await updateFruit(id, newFruit);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(template(fruit, onEdit));
}