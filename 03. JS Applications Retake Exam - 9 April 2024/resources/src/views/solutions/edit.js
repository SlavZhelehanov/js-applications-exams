import {html} from '../../../node_modules/lit-html/lit-html.js';
import {getById, updateSolution} from "../../services/solutionsService.js";

function template(solution, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <img class="border" src="./images/border.png" alt=""/>
                <h2>Edit Solution</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="Solution Type"
                            value=${solution?.type}
                    />
                    <input
                            type="text"
                            name="image-url"
                            id="image-url"
                            placeholder="Image URL"
                            value=${solution?.imageUrl}
                    />
                    <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            rows="2"
                            cols="10"
                    >${solution?.description}</textarea>
                    <textarea
                            id="more-info"
                            name="more-info"
                            placeholder="more Info"
                            rows="2"
                            cols="10"
                    >${solution?.learnMore}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    const solution = await getById(id);

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newSolution = {
            type: formData.get('type').trim(),
            imageUrl: formData.get('image-url').trim(),
            description: formData.get('description').trim(),
            learnMore: formData.get('more-info').trim()
        }

        if (Object.values(newSolution).some((x) => !x)) return alert("All fields are required!");

        await updateSolution(id, newSolution);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(template(solution, onEdit));
}