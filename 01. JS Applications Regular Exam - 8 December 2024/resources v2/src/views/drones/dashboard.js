import {html} from '../../lib/lit-html.min.js';
import {getAllDrones} from '../../services/dronesService.js';
import {notify} from '../../utils/utils.js';

function template(drones) {
    return html`
        <h3 class="heading">Marketplace</h3>
        <section id="dashboard">
            ${0 < drones.length
                    ? html`${drones.map(drone => html`
                        <div class="drone">
                            <img src=${drone.imageUrl} alt="example1"/>
                            <h3 class="model">${drone.model}</h3>
                            <div class="drone-info">
                                <p class="price">Price: €${drone.price}</p>
                                <p class="condition">Condition: ${drone.condition}</p>
                                <p class="weight">Weight: ${drone.weight}g</p>
                            </div>
                            <a class="details-btn" href="/details/${drone._id}">Details</a>
                        </div>`)}
                    </section>`
                    : html`<h3 class="no-drones">No Drones Available</h3>`
            }`
}

export async function dashboardPage(ctx) {
    try {
        const Drones = await getAllDrones();

        ctx.render(template(Drones));
    } catch (error) {
        notify(error.message);
    }
}