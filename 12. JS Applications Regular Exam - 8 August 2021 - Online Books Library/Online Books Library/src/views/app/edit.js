import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";

function template(item, onEdit, selection) {
    return html`
        <section id="edit-page" class="edit">
            <form id="edit-form" @submit=${onEdit}>
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value=${item.title}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description">${item.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value=${item.imageUrl}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value="Fiction">
                                ${selection.map(x => html`<option value=${x.key} ?selected=${x.selected}>${x.key}</option>`)}
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id, options = ['Fiction', 'Romance', 'Mistery', 'Classic', 'Other'];
    let item = {}, selection = [];

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            type: formData.get('type').trim()
        }

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/books/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/books/${id}`);

        for (let opt of options) {
            if (item.type === opt) selection.push({key: opt, selected: true});
            else selection.push({key: opt, selected: false});
        }
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, onEdit, selection));
}