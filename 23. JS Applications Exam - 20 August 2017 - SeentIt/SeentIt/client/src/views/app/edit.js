import { html } from "../../lib/lit-html.min.js";
import { get, put } from "../../utils/api.js";

function template({ data, onEdit }) {
    return html`
        <section id="viewEdit">
            <div class="submitArea">
                <h1>Edit Link</h1>
                <p>Please, fill out the form. A thumbnail image/description is not required.</p>
            </div>
            <div class="submitArea formContainer">
                <form id="editPostForm" class="submitForm" @submit=${onEdit}>
                    <label>Link URL:</label>
                    <input name="url" type="text" value=${data?.url}>
                    <label>Link Title:</label>
                    <input name="title" type="text" value=${data?.title}>
                    <label>Link Thumbnail Image (optional):</label>
                    <input name="image" type="text" value=${data?.imageUrl}>
                    <label>Comment (optional):</label>
                    <textarea name="description">${data?.description}</textarea>
                    <input id="btnEditPost" type="submit" value="Edit Post">
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const { id } = ctx.params;
    let data = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            url: formData.get('url').trim(),
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('image').trim()
        }

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            await put(`/app/post/${id}`, item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    try {
        data = await get(`/app/post/${id}`);
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(template({ data, onEdit }));
}