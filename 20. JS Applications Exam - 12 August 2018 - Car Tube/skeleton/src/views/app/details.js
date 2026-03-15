import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template({item, onDelete, isOwner}) {
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
                    ${isOwner
                            ? html`<a href="/edit/${item._id}" class="button-list">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
                            : null
                    }
                </div>
                <p id="description-title">Description:</p>
                <p id="description-para">${item.description}</p>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/cars/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }
    }

    try {
        item = await get(`/data/cars/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    ctx.render(template({onDelete, isOwner, item}));
}