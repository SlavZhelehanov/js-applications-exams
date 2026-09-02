import { html } from "../../lib/lit-html.min.js";
import { get, put } from "../../utils/api.js";

function template({ data, onUpdate }) {
    const categories = ['-- Изберете категория --', 'JavaScript', 'C#', 'Java', 'Python'];

    return html`<div class="container">
            <form @submit=${onUpdate}>
                <fieldset>
                    <legend>Edit article</legend>
                    <p class="field title">
                        <input type="text" name="title" id="title" placeholder="Arrays" value=${data.title}>
                        <label for="title">Title:</label>
                    </p>
                    <p class="field category">
                        <select id="category" name="category" required>
                            ${categories.map(cat =>
        html`<option value="${cat}" ?selected=${data.category === cat}>${cat}</option>`
    )}
                        </select>
                        <label for="category">Category:</label>
                    </p>
                    <p class="field content">
                        <textarea name="content" id="content">${data.content}</textarea>
                        <label for="content">Content:</label>
                    </p>

                    <p class="field submit">
                        <button class="btn submit" type="submit">Edit</button>
                    </p>

                </fieldset>
            </form>
        </div>`;
}

export async function editPage(ctx) {
    const { id } = ctx.params;
    let data = {};

    async function onUpdate(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const item = {
            title: formData.get('title').trim(),
            content: formData.get('content').trim(),
            category: formData.get('category')?.trim()
        };
        const availableCategories = ["JavaScript", "C#", "Java", "Python"];

        if (item.title.length < 6) return alert('The title should be at least 6 characters long.');
        if (item.content.length < 10) return alert('The content should be at least 10 characters long.');
        if (!availableCategories.some(c => c === item.category)) return alert('The category should be one of "JavaScript" or "C#", or "Java", or "Python"');

        try {
            await put(`/app/${id}`, item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    try {
        data = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message || err);
    }

    return ctx.render(template({ data, onUpdate }));
}