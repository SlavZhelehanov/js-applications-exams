import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";
import { getUserData } from '../../utils/utils.js';

function template({ onLike, canLike, creator, item }) {
    return html`
        <div class="container">
            <div class="row bg-light text-dark">
                <h1>Movie title: ${item.title}</h1>
                <div class="col-md-8">
                    <img class="img-thumbnail" src=${item.imageUrl} alt=${item.title}>
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${item.description}</p>
                    ${creator
            ? html`<a class="btn btn-warning" href="/${item.movieId}/edit">Edit</a>`
            : canLike
                ? html`<a class="btn btn-primary" @click=${onLike} href="javascript:void()">Like</a>`
                : null
        }
                    <a class="btn btn-danger" href="#">Delete</a>                   
                    
                    <span class="enrolled-span">Liked ${item?.likedFrom?.length || 0}</span>
                </div>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, authData = getUserData();
    let item = {}, userId = authData ? authData.user.id : null, creator = false, canLike = false;

    async function onLike() {
        try {
            await put(`/app/${id}/like`, { movieId: id });
            ctx.page.redirect(`/${id}/details`);
        } catch (error) {
            alert(error.message || error);
        }
    }


    try {
        item = await get(`/app/${id}`);
        creator = userId === item.creator;
        canLike = userId && !creator ? !item?.likedFrom?.some(usr => usr === userId) : false;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({ item, creator, canLike, onLike }));
}