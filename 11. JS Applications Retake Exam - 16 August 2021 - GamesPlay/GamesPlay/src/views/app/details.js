import { html } from '../../lib/lit-html.min.js';
import { get, del, post } from "../../utils/api.js";

function template(item, isOwner, onDelete, isAuth, comments, makeComment) {
    return html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${item.imageUrl} />
                    <h1>${item.title}</h1>
                    <span class="levels">MaxLevel: ${item.maxLevel}</span>
                    <p class="type">${item.category}</p>
                </div>


                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                ${isOwner
            ? html`<a href="/edit/${item._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>`
            : null
        }
                </div>
            </div>

                <label>Add new comment:</label>
                <form class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>

        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {}, isOwner = false, comments = [];


    try {
        item = await get(`/data/games/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner, onDelete, isAuth, comments, makeComment));
}