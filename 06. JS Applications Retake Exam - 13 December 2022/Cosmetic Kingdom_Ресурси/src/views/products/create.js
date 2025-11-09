import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Product</h2>
                <form class="create-form">
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
    ctx.render(template());
}