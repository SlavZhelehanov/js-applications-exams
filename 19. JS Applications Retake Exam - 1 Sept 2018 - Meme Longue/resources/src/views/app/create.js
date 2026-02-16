import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";

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

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/memes", item);
            e.target.reset();
            ctx.page.redirect('/app');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}