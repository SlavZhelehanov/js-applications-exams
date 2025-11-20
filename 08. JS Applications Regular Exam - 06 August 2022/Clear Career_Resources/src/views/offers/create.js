import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <h2>Create Offer</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="title"
                            id="job-title"
                            placeholder="Title"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="job-logo"
                            placeholder="Company logo url"
                    />
                    <input
                            type="text"
                            name="category"
                            id="job-category"
                            placeholder="Category"
                    />
                    <textarea
                            id="job-description"
                            name="description"
                            placeholder="Description"
                            rows="4"
                            cols="50"
                    ></textarea>
                    <textarea
                            id="job-requirements"
                            name="requirements"
                            placeholder="Requirements"
                            rows="4"
                            cols="50"
                    ></textarea>
                    <input
                            type="text"
                            name="salary"
                            id="job-salary"
                            placeholder="Salary"
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
        const offer = {
            title: formData.get('title').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            requirements: formData.get('requirements').trim(),
            salary: formData.get('salary').trim()
        }

        if (Object.values(offer).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/offers", offer);
            e.target.reset();
            ctx.page.redirect('/offers');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}