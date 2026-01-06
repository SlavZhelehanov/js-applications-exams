import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";

function template(item, onEdit) {
    return html`
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${onEdit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value=${item.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value=${item.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value=${item.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value=${item.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${item.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value=${item.price}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = {
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            description: formData.get('description').trim(),
            year: +formData.get('year').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            price: +formData.get('price').trim()
        }

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/cars/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/cars/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, onEdit));
}