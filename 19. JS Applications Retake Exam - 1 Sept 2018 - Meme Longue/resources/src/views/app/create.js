import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template(onCreate) {
    return html`
        <div id="create-meme">
            <form @submit=${onCreate}>
                <div class="container">
                    <h1>Create Meme</h1>
                    <p>Please fill in this form to create an meme.</p>

                    <p>Title</p>
                    <input type="text" placeholder="Enter Title" name="title">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Meme Image</p>
                    <input type="text" placeholder="Enter meme ImageUrl" name="imageUrl">

                    <button type="submit" class="registerbtn">Create Meme</button>
                </div>
            </form>
        </div>`;
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

        if (Object.values(item).some((x) => !x)) return showMessage("errorBox", "All fields are required!");
        if (33 < item.title.length) return showMessage("errorBox", "The title length must not exceed 33 characters!");
        if (item.description.length < 30 || 450 < item.description.length) return showMessage("errorBox", "The description length must not exceed 450 characters and should be at least 30!");
        if (!item.imageUrl.startsWith("http://") && !item.imageUrl.startsWith("https://")) return showMessage("errorBox", "Link url should always start with “http”.");

        try {
            showMessage("loadingBox", "Loading...");
            await post("/data/memes", item);
            await showMessage("infoBox", "meme created.");
            e.target.reset();
            ctx.page.redirect('/app');
        } catch (err) {
            if (err.message) showMessage("errorBox", err.message);
            else showMessage("errorBox", err);
        }
    }

    ctx.render(template(onCreate));
}