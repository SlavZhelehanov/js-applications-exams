import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(shoe) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit item</h2>
                <form class="edit-form">
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

    try {
        shoe = await get(`/data/shoes/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(shoe));
}