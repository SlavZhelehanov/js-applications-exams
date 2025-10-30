import {html} from '../../lib/lit-html.min.js';
import {getOneDrone, updateDrone} from "../../services/dronesService.js";
import {notify} from "../../utils/utils.js";

function template(drone, onEdit) {
    return html`
        <section id="edit">
            <div class="form form-item">
                <h2>Edit Offer</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input type="text" name="model" id="model" placeholder="Drone Model" value=${drone.model}/>
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value=${drone.imageUrl}/>
                    <input type="number" name="price" id="price" placeholder="Price" value=${drone.price}/>
                    <input type="number" name="weight" id="weight" placeholder="Weight" value=${drone.weight}/>
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" value=${drone.phone}/>
                    <input type="text" name="condition" id="condition" placeholder="Condition" value=${drone.condition}/>
                    <textarea name="description" id="description" placeholder="Description">${drone.description}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let drone;

    try {
        drone = await getOneDrone(id);
    } catch (err) {
        notify(err.message);
        return ctx.page.redirect('/catalog');
    }

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newDrone = {
            model: formData.get('model').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            price: formData.get('price').trim(),
            condition: formData.get('condition').trim(),
            weight: formData.get('weight').trim(),
            description: formData.get('description').trim(),
            phone: formData.get('phone').trim()
        }

        try {
            if (Object.values(newDrone).some((x) => !x)) throw new Error("All fields are required!");

            await updateDrone(id, newDrone);
            e.target.reset();
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            notify(err.message);
        }
    }

    ctx.render(template(drone, onEdit));
}