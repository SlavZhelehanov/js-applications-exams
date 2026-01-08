import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(item, isOwner) {
    return html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${item.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${item.brand}</li>
                    <li><span>Model:</span>${item.model}</li>
                    <li><span>Year:</span>${item.year}</li>
                    <li><span>Price:</span>${item.price}$</li>
                </ul>

                <p class="description-para">${item.description}</p>

                <div class="listings-buttons">
                    ${isOwner
                            ? html`<a href="#" class="button-list">Edit</a>
                            <a href="#" class="button-list">Delete</a>`
                            : null
                    }
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false;

    try {
        item = await get(`/data/cars/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner));
}