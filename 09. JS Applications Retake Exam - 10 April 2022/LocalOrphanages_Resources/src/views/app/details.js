import {html} from '../../lib/lit-html.min.js';
import {get, del, post} from "../../utils/api.js";

function template(data, isOwner, onDelete, isAuth, canDonate, makeDonation) {
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
                            ${!isAuth
                                    ? null
                                    : isOwner
                                            ? html`<a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                                            : canDonate === 0
                                                    ? html`<a @click=${makeDonation} href="javascript:void(0)"
                                                              class="donate-btn btn">Donate</a>`
                                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let data = {}, isOwner = false, canDonate = 0;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await del(`/data/posts/${id}`);
            ctx.page.redirect('/');
        }
    }

    async function makeDonation() {
        try {
            await post('/data/donations', {postId: id});
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        data = await get(`/data/posts/${id}`);
        isOwner = isAuth && data._ownerId === ctx.userData._id;

        if (isAuth) canDonate = await get(`/data/donations?where=postId%3D%22${id}%22%20and%20_ownerId%3D%22${ctx.userData._id}%22&count`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data, isOwner, onDelete, isAuth, canDonate, makeDonation));
}