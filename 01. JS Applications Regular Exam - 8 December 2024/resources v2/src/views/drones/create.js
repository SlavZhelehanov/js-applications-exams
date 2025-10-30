import {html} from "../../lib/lit-html.min.js";
import {createDrone} from "../../services/dronesService.js";
import {notify} from "../../utils/utils.js";

function template(onCreate) {
    return html`
        <section id="create">
            <div class="form form-item">
                <h2>Add Drone Offer</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input type="text" name="model" id="model" placeholder="Drone Model"/>
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL"/>
                    <input type="number" name="price" id="price" placeholder="Price"/>
                    <input type="number" name="weight" id="weight" placeholder="Weight"/>
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact"/>
                    <input type="text" name="condition" id="condition" placeholder="Condition"/>
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                    <button type="submit">Add</button>
                </form>

            </div>
        </section>`;
}

export function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const drone = {
            model: formData.get('model').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            price: formData.get('price').trim(),
            condition: formData.get('condition').trim(),
            weight: formData.get('weight').trim(),
            description: formData.get('description').trim(),
            phone: formData.get('phone').trim()
        }

        try {
            if (Object.values(drone).some((x) => !x)) throw new Error("All fields are required!");

            await createDrone(drone);
            e.target.reset();
            ctx.page.redirect('/catalog');
        } catch (err) {
            notify(err.message);
        }
    }

    ctx.render(template(onCreate));
}