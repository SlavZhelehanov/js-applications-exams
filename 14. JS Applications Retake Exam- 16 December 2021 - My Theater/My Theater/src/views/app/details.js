import { html } from '../../lib/lit-html.min.js';
import { get, del, post } from "../../utils/api.js";

function template(item, isOwner, onDelete, isAuth, likes, onLike, canLike) {
    return html`
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${item.title}</h1>
                    <div>
                        <img src=${item.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${item.description}</p>
                    <h4>Date: ${item.date}</h4>
                    <h4>Author: ${item.author}</h4>
                    <div class="buttons">
                        <a class="btn-delete" href="#">Delete</a>
                        <a class="btn-edit" href="#">Edit</a>
                        <a class="btn-like" href="#">Like</a>
            : isOwner
                ? html`<a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
                    </div>
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false, likes = 0, canLike = 0;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await del(`/data/theaters/${id}`);
            ctx.page.redirect('/');
        }
    }
    try {
        item = await get(`/data/theaters/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner, onDelete, isAuth, likes, onLike, canLike));
}