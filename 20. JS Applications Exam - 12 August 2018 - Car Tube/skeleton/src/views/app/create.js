import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template(onCreate) {
    return html`
        <div id="create-listing">
            <form @submit=${onCreate}>
                <div class="container">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Title</p>
                    <input type="text" placeholder="Enter Title" name="title">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Fuel Type</p>
                    <input type="text" placeholder="Enter Car Fuel Type" name="fuelType">

                    <p>Car Price</p>
                    <input type="number" max="1000000" placeholder="Enter Car Price" name="price">

                    <hr>
                    <button type="submit" class="registerbtn">Create Listing</button>
                </div>
            </form>
        </div>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
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

        try {
            showMessage("loadingBox", "Loading...");
            await post("/data/cars", {item});
            await showMessage("infoBox", "listing created.");
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showMessage("errorBox", err.message);
            else showMessage("errorBox", err);
        }
    }

    ctx.render(template(onCreate));
}