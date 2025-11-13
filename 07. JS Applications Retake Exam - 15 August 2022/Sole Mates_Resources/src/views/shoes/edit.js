import {html} from '../../lib/lit-html.min.js';

function template(p, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit item</h2>
                <form class="edit-form">
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

export async function editPage(ctx) {
    ctx.render(template());
}