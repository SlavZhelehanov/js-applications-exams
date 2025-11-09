import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Product</h2>
                <form class="edit-form">
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
                    <button type="submit">post</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    ctx.render(template());
}