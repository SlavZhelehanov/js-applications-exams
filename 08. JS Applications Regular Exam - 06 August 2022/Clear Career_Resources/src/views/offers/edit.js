import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";

function template(offer, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Offer</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="title"
                            id="job-title"
                            placeholder="Title"
                            value="${offer.title}"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="job-logo"
                            placeholder="Company logo url"
                            value="${offer.imageUrl}"
                    />
                    <input
                            type="text"
                            name="category"
                            id="job-category"
                            placeholder="Category"
                            value="${offer.category}"
                    />
                    <textarea
                            id="job-description"
                            name="description"
                            placeholder="Description"
                            rows="4"
                            cols="50"
                    >${offer.description}</textarea>
                    <textarea
                            id="job-requirements"
                            name="requirements"
                            placeholder="Requirements"
                            rows="4"
                            cols="50"
                    >${offer.requirements}</textarea>
                    <input
                            type="text"
                            name="salary"
                            id="job-salary"
                            placeholder="Salary"
                            value="${offer.salary}"
                    />
                    <button type="submit">post</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let offer = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newOffer = {
            title: formData.get('title').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            requirements: formData.get('requirements').trim(),
            salary: formData.get('salary').trim()
        }

        if (Object.values(newOffer).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/offers/${id}`, newOffer);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        offer = await get(`/data/offers/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(offer, onEdit));
}