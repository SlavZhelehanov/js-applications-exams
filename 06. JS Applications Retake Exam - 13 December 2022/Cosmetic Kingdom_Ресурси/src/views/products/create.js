import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Product</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Product Name"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="product-image"
                            placeholder="Product Image"
                    />
                    <input
                            type="text"
                            name="category"
                            id="product-category"
                            placeholder="Category"
                    />
                    <textarea
                            id="product-description"
                            name="description"
                            placeholder="Description"
                            rows="5"
                            cols="50"
                    ></textarea>
                    <input
                            type="text"
                            name="price"
                            id="product-price"
                            placeholder="Price"
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const product = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            category: formData.get('category').trim(),
            price: formData.get('price').trim()
        }

        if (Object.values(product).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/products", product);
            e.target.reset();
            ctx.page.redirect('/products');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}