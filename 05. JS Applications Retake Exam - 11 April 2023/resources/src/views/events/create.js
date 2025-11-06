import {html} from "../../lib/lit-html.min.js";
import {post} from "../../utils/api.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Event</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Event"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="event-image"
                            placeholder="Event Image URL"
                    />
                    <input
                            type="text"
                            name="category"
                            id="event-category"
                            placeholder="Category"
                    />
                    <textarea
                            id="event-description"
                            name="description"
                            placeholder="Description"
                            rows="5"
                            cols="50"
                    ></textarea>
                    <input
                            type="text"
                            name="date"
                            id="date"
                            placeholder="When?"
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const event = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
            category: formData.get('category').trim(),
            date: formData.get('date').trim()
        }

        if (Object.values(event).some((x) => !x)) return alert("All fields are required!");

        try {
            await post("/data/events", event);
            e.target.reset();
            ctx.page.redirect('/events');
        } catch (err) {
            alert(err.message);
        }
    }

    ctx.render(template(onCreate));
}