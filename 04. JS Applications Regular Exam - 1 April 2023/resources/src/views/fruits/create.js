import {html} from "../../lib/lit-html.min.js";
import {createFruit} from "../../services/fruitsService.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Fruit</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Fruit Name"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="Fruit-image"
                            placeholder="Fruit Image"
                    />
                    <textarea
                            id="fruit-description"
                            name="description"
                            placeholder="Description"
                            rows="10"
                            cols="50"
                    ></textarea>
                    <textarea
                            id="fruit-nutrition"
                            name="nutrition"
                            placeholder="Nutrition"
                            rows="10"
                            cols="50"
                    ></textarea>
                    <button type="submit">Add Fruit</button>
                </form>
            </div>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const fruit = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            nutrition: formData.get('nutrition').trim()
        }

        if (Object.values(fruit).some((x) => !x)) return alert("All fields are required!");

        await createFruit(fruit);
        e.target.reset();
        ctx.page.redirect('/fruits');
    }

    ctx.render(template(onCreate));
}