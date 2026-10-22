import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";

function template(onCreate) {
    return html`<form class="text-center border border-light p-5" @submit=${onCreate} method="post">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="url" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            title: formData.get('title').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
        }

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/app", item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message || err);
        }
    }

    ctx.render(template(onCreate));
}