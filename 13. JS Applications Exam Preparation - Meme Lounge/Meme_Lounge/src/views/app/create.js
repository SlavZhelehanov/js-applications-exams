import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { showError } from "../../utils/utils.js";

function template(onCreate) {
    return html`
        <section id="create-meme">
            <form id="create-form" @submit=${onCreate}>
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim()
        }

        if (Object.values(item).some((x) => !x)) return showError("All fields are required!");

        try {
            await post("/data/memes", item);
            e.target.reset();
            ctx.page.redirect('/app');
        } catch (err) {
            showError(err.message);
        }
    }

    ctx.render(template(onCreate));
}