import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template({item}) {
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
                    <a class="btn btn-danger" href="#">Delete</a>
                    <a class="btn btn-warning" href="#">Edit</a>
                    <a class="btn btn-primary" href="#">Like</a>
                    <span class="enrolled-span">Liked ${item?.likedFrom?.length || 0}</span>
                </div>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    try {
        item = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({item}));
}