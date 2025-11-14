import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";

function template(shoe, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit item</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="brand"
                            id="shoe-brand"
                            placeholder="Brand"
                            value=${shoe.brand}
                    />
                    <input
                            type="text"
                            name="model"
                            id="shoe-model"
                            placeholder="Model"
                            value=${shoe.model}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="shoe-img"
                            placeholder="Image url"
                            value=${shoe.imageUrl}
                    />
                    <input
                            type="text"
                            name="release"
                            id="shoe-release"
                            placeholder="Release date"
                            value=${shoe.release}
                    />
                    <input
                            type="text"
                            name="designer"
                            id="shoe-designer"
                            placeholder="Designer"
                            value=${shoe.designer}
                    />
                    <input
                            type="text"
                            name="value"
                            id="shoe-value"
                            placeholder="Value"
                            value=${shoe.value}
                    />
                    <button type="submit">post</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let shoe = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newPair = {
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            release: formData.get('release').trim(),
            designer: formData.get('designer').trim(),
            value: formData.get('value').trim()
        }

        if (Object.values(newPair).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/shoes/${id}`, newPair);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        shoe = await get(`/data/shoes/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(shoe, onEdit));
}