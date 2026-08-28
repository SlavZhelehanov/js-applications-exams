import { html } from "../../lib/lit-html.min.js";
function template() {
    return html`<div class="container">
            <form action="#" method="">
                <fieldset>
                    <legend>Edit article</legend>
                    <p class="field title">
                        <input type="text" name="title" id="title" placeholder="Arrays">
                        <label for="title">Title:</label>
                    </p>
                    <p class="field category">
                        <select id="category" name="category" required>
                            <option value="">-- Изберете категория --</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="C#">C#</option>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                        </select>
                        <label for="category">Category:</label>
                    </p>
                    <p class="field content">
                        <textarea name="content" id="content"></textarea>
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
    return ctx.render(template());
}