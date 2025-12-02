import {html} from '../../lib/lit-html.min.js';
import {get, post, del} from "../../utils/api.js";

function template(item, isOwner, onDelete, isAuth, donated, canDonate, onDonate) {
    return html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${item.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${item.name}</h1>
                        <h3>Breed: ${item.breed}</h3>
                        <h4>Age: ${item.age}</h4>
                        <h4>Weight: ${item.weight}</h4>
                        <h4 class="donation">Donation: ${donated * 100}$</h4>
                    </div>
                    <div class="actionBtn">
                        ${!isAuth
                                ? null
                                : isOwner
                                        ? html`<a href="/edit/${item._id}" class="edit">Edit</a>
                                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                                        : canDonate === 0
                                                ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
                                                : null
                        }
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {}, isOwner = false, isAuth = ctx.userData, donated = 0, canDonate = 0;

    async function onDonate() {
        try {
            await post(`/data/donation`, { petId: id });
            ctx.page.redirect(`/details/${id}`);
        } catch (error) {
            alert(error.message);
        }
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/pets/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                alert(err.message);
            }
        }
    }

    try {
        item = await get(`/data/pets/${id}`);
        donated = await get(`/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;

        if (isAuth) canDonate = await get(`/data/donation?where=petId%3D%22${id}%22%20and%20_ownerId%3D%22${ctx.userData._id}%22&count`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner, onDelete, isAuth, donated, canDonate, onDonate));
}