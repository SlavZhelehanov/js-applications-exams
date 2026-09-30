import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";
import { getUserData } from '../../utils/utils.js';

function template({ onBuy, canBuy, creator, item }) {
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
                ${creator
            ? html`<a href="/${item.shoeShelfId}/edit">Edit</a>
                <a>Delete</a>`
            : canBuy
                ? html`<a href="#" @click=${onBuy}>Buy</a>`
                : html`<span>You bought it</span>`
        }
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, authData = getUserData();
    let item = {}, userId = authData ? authData.user.id : null, creator = false, canBuy = false;

    async function onBuy() {
        try {
            await put(`/app/${id}/buy`, { petId: id });
            ctx.page.redirect(`/${id}/details`);
        } catch (error) {
            alert(error.message || error);
        }
    }

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
        canBuy = userId && !creator ? !item.peopleBoughtIt.some(usr => usr === userId) : false;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({ item, creator, canBuy, onBuy }));
}