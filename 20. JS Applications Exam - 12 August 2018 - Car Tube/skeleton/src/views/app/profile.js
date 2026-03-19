import { html } from '../../lib/lit-html.min.js';
import { get, del } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template({ onDelete, items }) {
    return html`
       <div class="my-listings">
            <h1>My car listings</h1>
            <div class="car-listings">
            ${0 < items.length
            ? items.map(i => html`<div class="my-listing">
                    <p id="listing-title">${i.title}</p>
                    <img src=${i.imageUrl}>

                    <div class="listing-props">
                        <h2>Brand: ${i.brand}</h2>
                        <h3>Model: ${i.model}</h3>
                        <h3>Year: ${i.year}</h3>
                        <h3>Price: ${i.price}$</h3>
                    </div>
                    <div class="my-listing-buttons">
                        <a href="/details/${i._id}" class="my-button-list">Details</a>
                        <a href="/edit/${i._id}" class="my-button-list">Edit</a>
                        <a @click=${() => onDelete(i._id)} href="javascript:void(0)" class="my-button-list">Delete</a>
                    </div>
                </div>`)
            : html`<p class="no-cars"> No cars in database.</p>`
        }
            </div>
        </div>`;
}

export async function profilePage(ctx) {
    const userId = ctx.userData._id;
    let items = [];

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                showMessage("loadingBox", "Loading...");
                await del(`/data/cars/${id}`);
                await showMessage("infoBox", "Listing deleted.");
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) showMessage("errorBox", err.message);
                else showMessage("errorBox", err);
            }
        }
    }

    try {
        showMessage("loadingBox", "Loading...");
        items = await get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        showMessage("endLoadingBox", "...");
    } catch (err) {
        if (err.message) showMessage("errorBox", err.message);
        else showMessage("errorBox", err);
    }
    ctx.render(template({ onDelete, items }));
}