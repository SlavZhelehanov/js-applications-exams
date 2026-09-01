import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template({ data }) {
    const categories = ['JavaScript', 'C#', 'Java', 'Python'];

    return html`<div class="container">
            <form action="#" method="">
                <fieldset>
                    <legend>Edit article</legend>
                    <p class="field title">
                        <input type="text" name="title" id="title" placeholder="Arrays" value=${data.title}>
                        <label for="title">Title:</label>
                    </p>
                    <p class="field category">
                        <select id="category" name="category" required>
                        <option value="">-- Изберете категория --</option>
                            ${categories.map(cat => 
                                html`<option value="${cat}" ${data.category === cat ? 'selected' : ''}>${cat}</option>`
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

    try {
        data = await get(`/app/${id}`);
    } catch (err) {
        alert(err.message || err);
    }

    return ctx.render(template({ data }));
}