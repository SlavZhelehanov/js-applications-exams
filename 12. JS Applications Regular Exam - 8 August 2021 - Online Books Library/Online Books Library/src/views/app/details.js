import {html} from '../../lib/lit-html.min.js';
import {get, post, del} from "../../utils/api.js";

function template(item, isOwner, isAuth, likesCount, canLike, onLike, onDelete) {
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
                                    ? html`<a class="button" href="/edit/${item._id}">Edit</a>
                                    <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>`
                                    : canLike === 0
                                            ? html`<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>`
                                            : null
                    }
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likesCount}</span>
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
    let item = {}, isOwner = false, likesCount = 0, canLike = 0;

    async function onLike() {
        try {
            await post('/data/likes', { bookId: id });
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/books/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                alert(err.message);
            }
        }
    }

    try {
        item = await get(`/data/books/${id}`);
        likesCount = await get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;

        if(isAuth && !isOwner) canLike = await get(`/data/likes?where=bookId%3D%22${id}%22%20and%20_ownerId%3D%22${ctx.userData._id}%22&count`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner, isAuth, likesCount, canLike, onLike, onDelete));
}