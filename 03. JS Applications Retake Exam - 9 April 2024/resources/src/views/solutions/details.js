import { html } from '../../../node_modules/lit-html/lit-html.js';
import {getById, deleteSolution, getLikes, likeSolution, getUserLikes} from "../../services/solutionsService.js";

function template(item, isAuthor, canLike, onLike, onDelete) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${item.imageUrl} alt="example1"/>
                <div>
                    <p id="details-type">${item.type}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p id="description">${item.description}</p>
                            <p id="more-info">${item.learnMore}</p>
                        </div>
                    </div>
                    <h3>Like Solution:<span id="like">${item.likes ? item.likes : 0}</span></h3>

                    <!--Edit and Delete are only for creator-->
                    <div id="action-buttons">
                        ${isAuthor
                                ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                                : canLike
                                        ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
                                        : null
                        }
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = await getById(id);
    let likes = await getLikes(id);
    const usersLikes = !!ctx.userData ? await getUserLikes(ctx.userData._id, id) : 1;
    const canLike = ctx.userData && usersLikes === 0;
    const isAuthor = canLike && ctx.userData._id === item._ownerId;

    async function onLike() {
        try {
            await likeSolution(id);
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err);
        }
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteSolution(id);
            ctx.page.redirect('/solutions');
        }
    }

    item.likes = likes;

    ctx.render(template(item, isAuthor, canLike, onLike, onDelete));
}