import {html} from "../../../node_modules/lit-html/lit-html.js";
import {createSolution} from "../../services/solutionsService.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <img class="border" src="./images/border.png" alt=""/>
                <h2>Add Solution</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="Solution Type"
                    />
                    <input
                            type="text"
                            name="image-url"
                            id="image-url"
                            placeholder="Image URL"
                    />
                    <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            rows="2"
                            cols="10"
                    ></textarea>
                    <textarea
                            id="more-info"
                            name="more-info"
                            placeholder="more Info"
                            rows="2"
                            cols="10"
                    ></textarea>
                    <button type="submit">Add Solution</button>
                </form>
            </div>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const solution = {
            type: formData.get('type').trim(),
            imageUrl: formData.get('image-url').trim(),
            description: formData.get('description').trim(),
            learnMore: formData.get('more-info').trim()
        }
        if (Object.values(solution).some((x) => !x)) return alert("All fields are required!");

        await createSolution(solution);
        e.target.reset();
        ctx.page.redirect('/solutions');
    }

    ctx.render(template(onCreate));
}