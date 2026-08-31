import { html } from "../../lib/lit-html.min.js";
import { get, del } from "../../utils/api.js";
import { getUserData } from "../../utils/utils.js";

function template({ data, user, onDelete }) {
    return html`
        <div class="container details">
            <div class="details-content">
                <h2>${data.title}</h2>
                <strong>${data.category}</strong>
                <p>${data.content}</p>
                <div class="buttons">
                    ${user && user.id === data.creator
            ? html`<a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                    <a href="/${data.articleId}/edit" class="btn edit">Edit</a>`
            : html`<a href="/" class="btn edit">Back</a>`
        }
                </div>
            </div>
        </div>`;
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
            alert('Idea deleted successfully.');
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