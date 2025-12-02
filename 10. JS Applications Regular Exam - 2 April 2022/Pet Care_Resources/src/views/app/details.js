import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(item) {
    return html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${item.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${item.name}</h1>
                        <h3>Breed: ${item.breed}</h3>
                        <h4>Age: ${item.age}</h4>
                        <h4>Weight: ${item.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        <!-- Only for registered user and creator of the pets-->
                        <a href="#" class="edit">Edit</a>
                        <a href="#" class="remove">Delete</a>
                        <!--(Bonus Part) Only for no creator and user-->
                        <a href="#" class="donate">Donate</a>
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    try {
        item = await get(`/data/pets/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item));
}