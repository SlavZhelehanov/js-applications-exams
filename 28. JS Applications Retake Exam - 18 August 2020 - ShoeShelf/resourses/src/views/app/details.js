import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";
import { getUserData } from '../../utils/utils.js';

function template({ creator, item }) {
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
                <a>Delete</a>
                ${creator
            ? html`<a href="/${item.shoeShelfId}/edit">Edit</a>
            : null
        }
                
                <a>Buy</a>
                <span>You bought it</span>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, authData = getUserData();
    let item = {}, userId = authData ? authData.user.id : null, creator = false;

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
        creator = userId === item.creator;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({ item, creator }));
}