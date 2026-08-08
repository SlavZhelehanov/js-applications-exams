import { html } from "../../lib/lit-html.min.js";
import { get, put, del } from "../../utils/api.js";
import { getUserData } from "../../utils/utils.js";

function template({ data, user, onDelete, onUpdate }) {
    return html`<div class="container home some">
            <img class="det-img" src=${data.imageURL} />
            <div class="desc">
                <h2 class="display-5">${data.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${data.description}</p>
                <p class="infoType">Likes: <large>${data.likes}</large>
                </p>
                <p class="infoType">Comments:</p>
                <ul>
                    ${data.comments.length === 0
            ? html`<li class="comment">No comments yet :(</li>`
            : data.comments.map(cmnt => html`<li class="comment">${cmnt}</li>`)
        }
                </ul>
            </div>
            ${user && user.id === data.creator
            ? html`<div class="text-center"><a class="btn detb" @click=${onDelete} href="javascript:void(0)">Delete</a></div>`
            : user && user.id !== data.creator
                ? html`<form class="text-center" method="post" @submit=${(e) => onUpdate({ comment: true, e })}>
                <textarea class="textarea-det" name="newComment" id=""></textarea>
                <button type="submit" class="btn detb">Comment</button>
                <a @click=${() => onUpdate({ like: true })} class="btn detb" href="javascript:void(0)">Like</a>
            </form>`
                : null
        }            
        </div>    `;
}

export async function detailsPage(ctx) {
    const { id } = ctx.params;
    const userData = getUserData();
    const user = userData ? userData.user : null;
    let data = {};

    async function onDelete() {
        const confirm = window.confirm('Are you sure you want to delete this idea?');
        if (!confirm) return;

        try {
            await del(`/app/${id}`);
            ctx.page.redirect('/');
        } catch (err) {
            return alert(err.message || err);
        }
    }

    async function onUpdate({
        like = false,
        comment = null,
        e = null
    }) {
        try {
            const payload = {};

            if (like) payload.like = true;
            if (comment) {
                e.preventDefault();

                const form = e.target;
                const formData = new FormData(form);
                const newComment = formData.get('newComment').trim();

                if (!newComment) return;

                payload.comment = newComment;
            }

            await put(`/app/${id}`, payload);

            if (comment) e.target.reset();

            ctx.page.redirect(`/${id}/details`);
        } catch (err) {
            alert(err.message || err);
        }
    }

    try {
        data = await get(`/app/${id}`);
    } catch (err) {
        return alert(err.message || err);
    }

    return ctx.render(template({ data, user, onDelete, onUpdate }));
}