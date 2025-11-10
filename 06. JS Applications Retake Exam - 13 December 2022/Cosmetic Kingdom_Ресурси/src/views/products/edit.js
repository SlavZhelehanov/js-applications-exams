import {html} from '../../lib/lit-html.min.js';
import {get, put} from '../../utils/api.js';

function template(p, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Product</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Product Name"
                            value=${p.name}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="product-image"
                            placeholder="Product Image"
                            value=${p.imageUrl}
                    />
                    <input
                            type="text"
                            name="category"
                            id="product-category"
                            placeholder="Category"
                            value=${p.category}
                    />
                    <textarea
                            id="product-description"
                            name="description"
                            placeholder="Description"
                            rows="5"
                            cols="50"
                    >${p.description}</textarea>

                    <input
                            type="text"
                            name="price"
                            id="product-price"
                            placeholder="Price"
                            value=${p.price}
                    />
                    <button type="submit">post</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let product = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newProduct = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            category: formData.get('category').trim(),
            price: formData.get('price').trim()
        }

        if (Object.values(newProduct).some((x) => !x)) return alert("All fields are required!");

        try {
            await put(`/data/products/${id}`, newProduct);
            e.target.reset();
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        product = await get(`/data/products/${id}`);
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(product, onEdit));
}