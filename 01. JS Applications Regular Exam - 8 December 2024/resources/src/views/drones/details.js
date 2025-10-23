import {html} from '../../../node_modules/lit-html/lit-html.js';
import {getUserData} from '../../utils/utils.js';
import {getById, deleteDrone} from '../../services/dronesService.js';

function detailsTemplate(drone, onDelete) {
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
                        <p class="details-weight">Weight: ${drone?.weight}</p>
                        <p class="drone-description">${drone?.description}</p>
                        <p class="phone-number">Phone: ${drone?.phone}</p>
                    </div>
                    ${drone.canEdit
                            ? html`
                                <div class="buttons">
                                    <a href="/catalog/${drone?._id}/edit" id="edit-btn">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                </div>
                            `
                            : null
                    }
                </div>
            </div>
        </section>
    `;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const userData = getUserData();

    if (userData && userData._id === item._ownerId) item.canEdit = true;

    ctx.render(detailsTemplate(item, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteDrone(id);
            ctx.page.redirect('/catalog');
        }
    }
}