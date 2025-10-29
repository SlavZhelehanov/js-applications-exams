import {html} from '../../../node_modules/lit-html/lit-html.js';

function template() {
    return html`
        <section id="edit">
            <div class="form">
                <img class="border" src="./images/border.png" alt=""/>
                <h2>Edit Solution</h2>
                <form class="edit-form">
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
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>`;
}

export function editPage(ctx) {
    ctx.render(template());
}