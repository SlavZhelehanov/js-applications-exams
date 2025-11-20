import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template(offer, isOwner) {
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
                <p>Applications: <strong id="applications">1</strong></p>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    ${isOwner
                            ? html`
                                <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                                <a href="" id="delete-btn">Delete</a>`
                            : null
                    }
                    

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <!--                    <a href="" id="apply-btn">Apply</a>-->
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let offer = {}, isOwner = false;

    try {
        offer = await get(`/data/offers/${id}`);
        isOwner = ctx.userData && offer._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(offer, isOwner));
}