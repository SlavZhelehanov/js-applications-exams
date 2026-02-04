import {html} from '../../lib/lit-html.min.js';
import {get, put} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template({isOwner, onSave, pet, likes}) {
    return html`
        ${isOwner
                ? html`
                    <section class="detailsMyPet">
                        <h3>${pet.name}</h3>
                        <p>Pet counter: <i class="fas fa-heart"></i> ${likes}</p>
                        <p class="img"><img src=${pet.imageURL}>
                        </p>
                        <form  @submit=${onSave}>
                            <textarea type="text" name="description">${pet.description}</textarea>
                            <button type="submit" class="button"> Save</button>
                        </form>
                    </section>`
                : html`
                    <section class="detailsOtherPet">
                        <h3>${pet.name}</h3>
                        <p>Pet counter: ${likes} <a href="#">
                            <button class="button"><i class="fas fa-heart"></i>
                                Pet
                            </button>
                        </a>
                        </p>
                        <p class="img"><img src=${pet.imageURL}></p>
                        <p class="description">${pet.description}</p>
                    </section>`
        }`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let pet = {}, isOwner = false, likes = 0;

    async function onSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newDescription = formData.get('description');

        try {
            showMessage("loading", 'Loading...');
            await put(`/data/pets/${pet._id}`, { ...pet, description: newDescription });
            await showMessage("info", "Pet updated successfuly")
            ctx.page.redirect(`/details/${pet._id}`);
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    try {
        pet = await get(`/data/pets/${id}`);
        likes = await get(`/data/likes`);
        likes = likes.filter(l => l.petId === id).length + +pet.likes;
        isOwner = ctx?.userData && pet._ownerId === ctx.userData._id;
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template({isOwner, likes, pet, onSave}));
}