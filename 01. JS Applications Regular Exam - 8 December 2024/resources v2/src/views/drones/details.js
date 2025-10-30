import {html} from '../../lib/lit-html.min.js';
import {deleteDrone, getOneDrone} from "../../services/dronesService.js";
import {notify} from "../../utils/utils.js";

function template(drone, isCreator, onDelete) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <div>
                    <img id="details-img" src=${drone?.imageUrl} alt="example1"/>
                    <p id="details-model">${drone?.model}</p>
                </div>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p class="details-price">Price: €${drone?.price}</p>
                        <p class="details-condition">Condition: ${drone?.condition}</p>
                        <p class="details-weight">Weight: ${drone?.weight}g</p>
                        <p class="drone-description">${drone?.description}</p>
                        <p class="phone-number">Phone: ${drone?.phone}</p>
                    </div>
                    <!--Edit and Delete are only for creator-->
                    <div class="buttons">
                        ${isCreator
                                ? html`
                                    <a href="/edit/${drone?._id}" id="edit-btn">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                `
                                : null
                        }

                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let drone, isCreator;

    try {
        drone = await getOneDrone(id);
        isCreator = drone._ownerId === ctx?.userData?._id;
    } catch (err) {
        notify(err.message);
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await deleteDrone(id);
                ctx.page.redirect('/catalog');
            } catch (err) {
                notify(err.message);
            }
        }
    }

    ctx.render(template(drone, isCreator, onDelete));
}