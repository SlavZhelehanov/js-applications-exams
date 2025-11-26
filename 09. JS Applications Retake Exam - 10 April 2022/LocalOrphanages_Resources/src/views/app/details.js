import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(data) {
    return html`
        <section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src=${data.imageUrl} alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${data.title}</h2>
                        <p class="post-description">Description: ${data.description}</p>
                        <p class="post-address">Address: ${data.address}</p>
                        <p class="post-number">Phone number: ${data.phone}</p>
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
    const id = ctx.params.id;
    let data = {};

    try {
        data = await get(`/data/posts/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}