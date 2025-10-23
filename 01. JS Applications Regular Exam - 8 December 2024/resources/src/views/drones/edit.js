import {html} from "../../../node_modules/lit-html/lit-html.js";
import {notify} from '../partials/notifications.js';
import {createSubmitHandler} from "../../utils/utils.js";
import {getById, updateDrone} from "../../services/dronesService.js";

function editTemplate(drone, onEdit) {
    return html`
        <section id="edit">
            <div class="form form-item">
                <h2>Edit Offer</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input type="text" name="model" id="model" placeholder="Drone Model" value=${drone?.model}/>
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value=${drone?.imageUrl}/>
                    <input type="number" name="price" id="price" placeholder="Price" value=${drone?.price}/>
                    <input type="number" name="weight" id="weight" placeholder="Weight" value=${drone?.weight}/>
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact"
                           value=${drone?.phone}/>
                    <input type="text" name="condition" id="condition" placeholder="Condition"
                           value=${drone?.condition}/>
                    <textarea name="description" id="description"
                              placeholder="Description">${drone?.description}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    const Drone = await getById(id);

    ctx.render(editTemplate(Drone, createSubmitHandler(onEdit)));

    async function onEdit({model, imageUrl, price, condition, weight, phone, description}) {
        if ([model, imageUrl, price, condition, weight, phone, description].some((el) => el === "")) {
            return notify("All fields are required");
        }

        await updateDrone(id, {model, imageUrl, price, condition, weight, phone, description});

        ctx.page.redirect("/catalog/" + id);
    }
}
