import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";

function template(onCreate) {
    return html`
        <section id="create-page" class="auth">
            <form id="create" @submit=${onCreate}>
                <div class="container">

                    <h1>Create Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title...">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category...">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Create Game">
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
            category: formData.get('category').trim(),
            maxLevel: formData.get('maxLevel').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            summary: formData.get('summary').trim()
        }

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/games", item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}