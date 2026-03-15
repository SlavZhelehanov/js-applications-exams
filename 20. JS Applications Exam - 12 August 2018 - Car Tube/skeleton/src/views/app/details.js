import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(item) {
    return html`
        <div class="listing-details">
            <div class="my-listing-details">
                <p id="auto-title">${item.title}</p>
                <img src="${item.imageUrl}">
                <div class="listing-props">
                    <h2>Brand: ${item.brand}</h2>
                    <h3>Model: ${item.model}</h3>
                    <h3>Year: ${item.year}</h3>
                    <h3>Fuel: ${item.fuelType}</h3>
                    <h3>Price: ${item.price}$</h3>
                </div>
                <div class="listings-buttons">

                    <a href="#" class="button-list">Edit</a>
                    <a href="#" class="button-list">Delete</a>


                </div>
                <p id="description-title">Description:</p>
                <p id="description-para">${item.description}</p>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    try {
        item = await get(`/data/cars/${id}`);
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    ctx.render(template(item));
}