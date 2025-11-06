import {html} from '../../lib/lit-html.min.js';
import {get, put} from '../../utils/api.js';

function template(e, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Event</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Event"
                            value=${e.name}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="event-image"
                            placeholder="Event Image"
                            value=${e.imageUrl}
                    />
                    <input
                            type="text"
                            name="category"
                            id="event-category"
                            placeholder="Category"
                            value=${e.category}
                    />
                    <textarea
                            id="event-description"
                            name="description"
                            placeholder="Description"
                            rows="5"
                            cols="50"
                    >${e.description}</textarea>
                    <label for="date-and-time">Event Time:</label>
                    <input
                            type="text"
                            name="date"
                            id="date"
                            placeholder="When?"
                            value=${e.date}
                    />
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let event = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newEvent = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            category: formData.get('category').trim(),
            date: formData.get('date').trim()
        }

        if (Object.values(newEvent).some((x) => !x)) return alert("All fields are required!");

        try {
            await put(`/data/events/${id}`, newEvent);
            e.target.reset();
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        event = await get(`/data/events/${id}`);
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(event, onEdit));
}