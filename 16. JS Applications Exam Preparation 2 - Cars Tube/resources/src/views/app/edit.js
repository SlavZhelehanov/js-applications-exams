import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    ctx.render(template());
}