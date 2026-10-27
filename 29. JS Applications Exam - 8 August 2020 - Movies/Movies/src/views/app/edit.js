import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template({item}) {
    return html`<form class="text-center border border-light p-5" action="#" method="">
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Movie Title" value=${item.title} name="title">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Movie Description..." name="description">${item.description}</textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" value=${item.imageUrl} name="imageUrl">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    try {
        item = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message || err);
    }

    ctx.render(template({item}));
}