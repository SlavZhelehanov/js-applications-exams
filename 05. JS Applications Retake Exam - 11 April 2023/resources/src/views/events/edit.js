import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Event</h2>
                <form class="edit-form">
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
                            placeholder="Event Image"
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

                    <label for="date-and-time">Event Time:</label>
                    <input
                            type="text"
                            name="date"
                            id="date"
                            placeholder="When?"
                    />

                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    ctx.render(template());
}