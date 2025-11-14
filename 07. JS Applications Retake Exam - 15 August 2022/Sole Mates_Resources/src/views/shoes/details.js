import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template(shoe, isOwner, onDelete) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <p id="details-title">Shoe Details</p>
                <div id="img-wrapper">
                    <img src=${shoe.imageUrl} alt="example1"/>
                </div>
                <div id="info-wrapper">
                    <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
                    <p>
                        Model: <span id="details-model">${shoe.model}</span>
                    </p>
                    <p>Release date: <span id="details-release">${shoe.release}</span></p>
                    <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
                    <p>Value: <span id="details-value">${shoe.value}</span></p>
                </div>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    ${isOwner
                            ? html`
                                <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                            : null
                    }
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let shoe = {}, isOwner = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await del(`/data/shoes/${id}`);
            ctx.page.redirect('/shoes');
        }
    }

    try {
        shoe = await get(`/data/shoes/${id}`);
        isOwner = ctx.userData && shoe._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(shoe, isOwner, onDelete));
}