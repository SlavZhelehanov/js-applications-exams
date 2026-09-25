import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(item) {
    return html`
        <h1>Edit Offer</h1>
        <p class="message"></p>
        <form>
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
                <button>Edit</button>
            </div>
        </form>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    try {
        item = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message || err);
    }

    ctx.render(template(item));
}