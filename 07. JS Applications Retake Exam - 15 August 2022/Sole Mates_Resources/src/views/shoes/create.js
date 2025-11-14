import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add item</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="brand"
                            id="shoe-brand"
                            placeholder="Brand"
                    />
                    <input
                            type="text"
                            name="model"
                            id="shoe-model"
                            placeholder="Model"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="shoe-img"
                            placeholder="Image url"
                    />
                    <input
                            type="text"
                            name="release"
                            id="shoe-release"
                            placeholder="Release date"
                    />
                    <input
                            type="text"
                            name="designer"
                            id="shoe-designer"
                            placeholder="Designer"
                    />
                    <input
                            type="text"
                            name="value"
                            id="shoe-value"
                            placeholder="Value"
                    />
                    <button type="submit">post</button>
                </form>
            </div>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const shoe = {
            brand: formData.get('brand').trim(),
            model: formData.get('model').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            release: formData.get('release').trim(),
            designer: formData.get('designer').trim(),
            value: formData.get('value').trim()
        }

        if (Object.values(shoe).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/shoes", shoe);
            e.target.reset();
            ctx.page.redirect('/shoes');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}