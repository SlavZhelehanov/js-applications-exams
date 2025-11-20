import {html} from '../../lib/lit-html.min.js';
import {get, del, post} from "../../utils/api.js";

function template(offer, isOwner, onDelete, isAuth, appCount, canApply, applyOffer) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src="${offer.imageUrl}" alt="example1"/>
                <p id="details-title">${offer.title}</p>
                <p id="details-category">Category: <span id="categories">${offer.category}</span></p>
                <p id="details-salary">Salary: <span id="salary-number">${offer.salary}</span></p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description</h4>
                        <span>${offer.description}</span>
                    </div>
                    <div id="details-requirements">
                        <h4>Requirements</h4>
                        <span>${offer.requirements}</span>
                    </div>
                </div>
                <p>Applications: <strong id="applications">${appCount}</strong></p>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    ${!isAuth
                            ? null
                            : isOwner
                                    ? html`
                                        <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                                    : canApply === 0
                                            ? html`<a @click=${applyOffer} href="javascript:void(0)" id="apply-btn">Apply</a>`
                                            : null
                    }
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = ctx.userData !== undefined;
    let offer = {}, isOwner = false, appCount = 0, canApply = 0;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await del(`/data/offers/${id}`);
            ctx.page.redirect('/offers');
        }
    }

    async function applyOffer() {
        try {
            await post('/data/applications', {offerId: id});
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        offer = await get(`/data/offers/${id}`);
        appCount = await get(`/data/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`);
        isOwner = isAuth && offer._ownerId === ctx.userData._id;

        if (isAuth) canApply = await get(`/data/applications?where=offerId%3D%22${id}%22%20and%20_ownerId%3D%22${ctx.userData._id}%22&count`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(offer, isOwner, onDelete, isAuth, appCount, canApply, applyOffer));
}