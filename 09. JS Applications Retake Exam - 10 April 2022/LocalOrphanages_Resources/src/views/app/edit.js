import {html} from '../../lib/lit-html.min.js';

function template(shoe, onEdit) {
    return html`
        <section id="edit-page" class="auth">
            <form id="edit">
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" value="">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" value="">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" value="">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" value="">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" value="">
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>`;
}

export async function editPage(ctx) {
    ctx.render(template());
}