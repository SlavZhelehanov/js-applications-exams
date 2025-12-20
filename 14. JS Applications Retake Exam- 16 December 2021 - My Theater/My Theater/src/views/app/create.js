import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";

function template(onCreate) {
    return html`
        <section id="createPage">
            <form class="create-form" @submit=${onCreate}>
                <h1>Create Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author">
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            title: formData.get('title').trim(),
            date: formData.get('date').trim(),
            author: formData.get('author').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim()
        }

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/theaters", item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}