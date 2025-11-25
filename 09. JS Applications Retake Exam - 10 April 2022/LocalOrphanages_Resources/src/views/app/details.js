import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="./images/clothes.jpeg" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">Clothes</h2>
                        <p class="post-description">Description: We need warm winter clothes. The sizes are for children from 2 to 14 years old. If possible, made from cotton materials, no superficial ones.</p>
                        <p class="post-address">Address: ul. Hristo Smirnenski 18, Sofia</p>
                        <p class="post-number">Phone number: 0888222345</p>
                        <p class="donate-Item">Donate Materials: 0</p>

                        <!--Edit and Delete are only for creator-->
                        <div class="btns">
                            <a href="#" class="edit-btn btn">Edit</a>
                            <a href="#" class="delete-btn btn">Delete</a>

                            <!--Bonus - Only for logged-in users ( not authors )-->
                            <a href="#" class="donate-btn btn">Donate</a>
                        </div>

                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}