import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(item, isOwner, isAuth) {
    return html`
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${item.title}</h3>
                <p class="type">Type: ${item.type}</p>
                <p class="img"><img src=${item.imageUrl}></p>
                <div class="actions">
                    ${!isAuth
                            ? null
                            : isOwner
                                    ? html`<a class="button" href="/edit/${book._id}">Edit</a>
                                    <a class="button" href="/delete">Delete</a>`
                                    : html`<a class="button" href="/like">Like</a>`
                    }
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${item.description}</p>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false;

    try {
        item = await get(`/data/books/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner, isAuth));
}