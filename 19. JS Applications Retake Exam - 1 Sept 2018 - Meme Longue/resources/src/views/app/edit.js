import { html } from '../../lib/lit-html.min.js';

function template(item, onEdit) {
    return html`
        <div id="edit-meme">
            <form>
                <h1>Edit Meme</h1>
                <div class="container">
                    <p>Please fill in this form to edit an meme.</p>

                    <p>Title</p>
                    <input type="text" placeholder="Enter Title" name="title" value="Title">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="Description">

                    <p>Meme Image</p>
                    <input type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="ImageUrl">

                    <button type="submit" class="registerbtn">Edit Meme</button>
                </div>
            </form>
        </div>`;
}

export async function editPage(ctx) {
    ctx.render(template());
}