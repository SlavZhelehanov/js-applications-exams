import {html} from "../../../node_modules/lit-html/lit-html.js";

function template() {
    return html`
        <section id="create">
            <div class="form">
                <img class="border" src="./images/border.png" alt=""/>
                <h2>Add Solution</h2>
                <form class="create-form">
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

export function createPage(ctx) {
    ctx.render(template());
}