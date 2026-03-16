import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(items) {
    return html`
        <div class="my-listings">
            <h1>My car listings</h1>
            <div class="car-listings">
                ${0 < items.length
                        ? items.map(i => html`
                            <div class="my-listing">
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
                                    <a href="#" class="my-button-list">Delete</a>
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

    try {
        items = await get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    ctx.render(template(items));
}