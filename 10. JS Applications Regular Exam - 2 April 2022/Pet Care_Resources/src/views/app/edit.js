import { html } from '../../lib/lit-html.min.js';
import { get, put } from "../../utils/api.js";

function template(item, onEdit) {
    return html`
        <section id="editPage">
            <form class="editForm" @submit=${onEdit}>
                <img src="/images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${item.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${item.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${item.age}">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${item.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${item.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    let item = {};

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newItem = {
            name: formData.get('name').trim(),
            breed: formData.get('breed').trim(),
            age: formData.get('age').trim(),
            weight: formData.get('weight').trim(),
            image: formData.get('image').trim()
        }

        if (Object.values(newItem).some((x) => !x)) return alert("All fields are required!");

        await put(`/data/pets/${id}`, newItem);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        item = await get(`/data/pets/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, onEdit));
}