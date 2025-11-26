import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template(data, isOwner, onDelete) {
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

                        <div class="btns">
                            ${isOwner
                                    ? html`<a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                                    : null
                            }


                            <!--Bonus - Only for logged-in users ( not authors )-->
<!--                            <a href="#" class="donate-btn btn">Donate</a>-->
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let data = {}, isOwner = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await del(`/data/posts/${id}`);
            ctx.page.redirect('/');
        }
    }

    try {
        data = await get(`/data/posts/${id}`);
        isOwner = !!ctx.userData && data._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data, isOwner, onDelete));
}