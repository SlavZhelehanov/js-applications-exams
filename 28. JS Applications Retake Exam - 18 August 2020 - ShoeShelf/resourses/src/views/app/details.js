import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template() {
function template({item}) {
    return html`
        <div class="offer-details">
            <h1>${item.brand} ${item.name}</h1>
            <div class="info">
                <img src=${item.imageUrl} alt=${item.name}>
                <div class="description">${item.description}
                    <br>
                    <br>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="actions">
                <a>Edit</a>
                <a>Delete</a>
                <a>Buy</a>
                <span>You bought it</span>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    // async function onDonate() {
    //     try {
    //         await post(`/data/donation`, { petId: id });
    //         ctx.page.redirect(`/details/${id}`);
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    // async function onDelete() {
    //     const choice = confirm('Are you sure?');

    //     if (choice) {
    //         try {
    //             await del(`/data/pets/${id}`);
    //             ctx.page.redirect('/');
    //         } catch (err) {
    //             alert(err.message);
    //         }
    //     }
    // }

    try {
        item = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({item}));
}