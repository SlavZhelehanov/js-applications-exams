import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";

function template(onCreate) {
    return html`<div class="container">
            <form method="post" @submit=${onCreate}>
                <fieldset>
                    <legend>Create article</legend>
                    <p class="field title">
                        <input type="text" id="title" name="title" placeholder="Arrays">
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
                        <button class="btn submit" type="submit">Create</button>
                    </p>

                </fieldset>
            </form>
        </div>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
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
            await post("/app", item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    return ctx.render(template(onCreate));
}