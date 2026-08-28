import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
function template(data) {
    return html`
        <div class="container details">
            <div class="details-content">
                <h2>${data.title}</h2>
                <strong>${data.category}</strong>
                <p>${data.content}</p>
                <div class="buttons">
                    <a href="#" class="btn delete">Delete</a>
                    <a href="#" class="btn edit">Edit</a>
                    <a href="/${data.articleId}/edit" class="btn edit">Edit</a>
                    <a href="#" class="btn edit">Back</a>
                </div>
            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    const { id } = ctx.params;
    let data = {};

    try {
        data = await get(`/app/${id}`);
        console.log(data);        
    } catch (err) {
        return alert(err.message || err);
    }

    return ctx.render(template(data));
}