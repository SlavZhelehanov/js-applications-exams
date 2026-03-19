import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template(item, onEdit) {
    return html`
        <div id="edit-listing">
            <form @submit=${onEdit}>
                <div class="container">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>
                    <input type="hidden" name="carId" value="" />

                    <p>Title</p>
                    <input type="text" placeholder="Enter Title" name="title" value=${item.title}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value=${item.description}>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value=${item.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value=${item.model}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value=${item.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${item.imageUrl}>

                    <p>Car Fuel Type</p>
                    <input type="text" placeholder="Enter Car Fuel Type" name="fuelType" value=${item.fuelType}>

                    <p>Car Price</p>
                    <input type="number" max="1000000" placeholder="Enter Car Price" name="price" value=${item.price}>

                    <hr>
                    <button type="submit" class="registerbtn">Edit Listing</button>
                </div>
            </form>
        </div>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            year: formData.get('year').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            fuelType: formData.get('fuelType').trim(),
            price: formData.get('price').trim(),
        }

        if (Object.values(item).some((x) => !x)) return showMessage("errorBox", "All fields are required!");
        if (33 < item.title.length) return showMessage("errorBox", "The title length must not exceed 33 characters!");
        if (item.description.length < 30 || 450 <= item.description.length) return showMessage("errorBox", "The description length must not exceed 450 characters and should be at least 30!");
        if (11 < item.brand.length || 11 < item.brand.length) return showMessage("errorBox", "The brand and fuelType and length must not exceed 11 characters!");
        if (item.brand.length < 4 && 11 < item.brand.length) return showMessage("errorBox", "The model length should be at least 4 characters and must not exceed 11 characters!");
        if (item.year.length !== 4) return showMessage("errorBox", "The year must be only 4 chars long!");
        if (1000000 < +item.price) return showMessage("errorBox", "The maximum price is 1000000$");
        if (!item.imageUrl.startsWith("http://") && !item.imageUrl.startsWith("https://")) return showMessage("errorBox", "Link url should always start with “http”.");

        showMessage("loadingBox", "Loading...");
        await put(`/data/cars/${id}`, newItem);
        await showMessage("infoBox", `Listing ${newItem.title} updated.`);
        e.target.reset();
        // ctx.page.redirect(`/details/${id}`);
        ctx.page.redirect(`/`);
    }

    try {
        item = await get(`/data/cars/${id}`);
    } catch (err) {
        if (err.message) showMessage("errorBox", err.message);
        else showMessage("errorBox", err);
    }

    ctx.render(template(item, onEdit));
}