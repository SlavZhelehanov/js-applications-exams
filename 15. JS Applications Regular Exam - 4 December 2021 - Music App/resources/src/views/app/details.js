import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template(item, isCreator, onDelete) {
    return html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${item.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">
                        <h1>Name: ${item.name}</h1>
                        <h3>Artist: ${item.artist}</h3>
                        <h4>Genre: ${item.genre}</h4>
                        <h4>Price: $${item.price}</h4>
                        <h4>Date: ${item.releaseDate}</h4>
                        <p>Description: ${item.description}</p>
                    </div>
                    <!-- Only for registered user and creator of the album-->
                    <div class="actionBtn">
                        ${isCreator
                                ? html`<a href="/edit/${item._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                                : null
                        }
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isCreator = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/albums/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                alert(err.message);
            }
        }
    }

    try {
        item = await get(`/data/albums/${id}`);

        if (isAuth && item._ownerId === ctx.userData._id) isCreator = true;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isCreator, onDelete));
}