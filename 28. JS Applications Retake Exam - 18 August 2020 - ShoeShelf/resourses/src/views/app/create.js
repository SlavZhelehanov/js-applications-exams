import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";

function template(onCreate) {
    return html`
        <h1>Create New Offer</h1>
        <p class="message"></p>
        <form @submit=${onCreate}>
            <div>
                <input type="text" name="name" placeholder="Name...">
            </div>
            <div>
                <input type="number" name="price" placeholder="Price...">
            </div>
            <div>
                <input type="url" name="imageUrl" placeholder="Image url...">
            </div>
            <div>
                <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
            </div>
            <div>
                <input name="brand" type="text" placeholder="Brand...">
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </form>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            name: formData.get('name').trim(),
            price: formData.get('price').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            brand: formData.get('brand').trim()
        }

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/app", item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message || err);
        }
    }

    ctx.render(template(onCreate));
}