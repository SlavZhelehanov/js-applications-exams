import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
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
            <div class="text-center">
                <a class="btn detb" href="#">Delete</a>
            </div>
            <form class="text-center" method="" action="">
                <textarea class="textarea-det" name="newComment" id=""></textarea>
                <button type="submit" class="btn detb">Comment</button>
                <a class="btn detb" href="">Like</a>
            </form>
        </div>    `;
}

export async function detailsPage(ctx) {
    const { id } = ctx.params;
    let data = {};

    try {
        data = await get(`/app/${id}`);
    } catch (error) {
        if (err.message) alert(err.message);
        else alert(err);
    }
    return ctx.render(template(data));
}