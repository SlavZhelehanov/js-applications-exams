import { html } from "../../lib/lit-html.min.js";
import { get, del } from "../../utils/api.js";
import { getUserData } from "../../utils/utils.js";

function template({ data, user, onDelete }) {
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
            ? html`<div class="text-center"><a class="btn detb" @click=${onDelete} href="#">Delete</a></div>`
            : user && user.id !== data.creator
                ? html`<form class="text-center" method="" action="">
                <textarea class="textarea-det" name="newComment" id=""></textarea>
                <button type="submit" class="btn detb">Comment</button>
                <a class="btn detb" href="">Like</a>
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

    try {
        data = await get(`/app/${id}`);
    } catch (err) {
        return alert(err.message || err);
    }

    return ctx.render(template({ data, user, onDelete }));
}