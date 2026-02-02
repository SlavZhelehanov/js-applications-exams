import {html} from '../../lib/lit-html.min.js';
import { get, del } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template({pets, onDelete}) {
    return html`
        <section class="my-pets">
            <h1>My Pets</h1>
            ${0 < pets.length 
                    ? html`<ul class="my-pets-list">
                        ${pets.map(pet => html`<section class="myPet">
                        <h3>Name: ${pet.name}</h3>
                        <p>Category: ${pet.category}</p>
                        <p class="img"><img src=${pet.imageURL}></p>
                        <p class="description">${pet.description}</p>
                        <div class="pet-info">
                            <a href="/details/${pet._id}">
                                <button class="button">Details</button>
                            </a>
                            <a href="#">
                                <button @click=${() => onDelete(m._id)} class="button">Delete</button>
                            </a>
                            <i class="fas fa-heart"></i> <span>${pet.likes}</span>
                        </div>
                    </section>`)}
                    </ul>` 
                    : null
    }
            <ul class="my-pets-list">
                <section class="myPet">
                    <h3>Name: Pesho</h3>
                    <p>Category: Cat</p>
                    <p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
                    <p class="description">This is my cat Pesho</p>
                    <div class="pet-info">
                        <a href="#">
                            <button class="button">Details</button>
                        </a>
                        <a href="#">
                            <button class="button">Delete</button>
                        </a>
                        <i class="fas fa-heart"></i> <span>5</span>
                    </div>
                </section>
                <section class="myPet">
                    <h3>Name: Pesho</h3>
                    <p>Category: Cat</p>
                    <p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
                    <p class="description">This is my cat Pesho</p>
                    <div class="pet-info">
                        <a href="#">
                            <button class="button">Details</button>
                        </a>
                        <a href="#">
                            <button class="button">Delete</button>
                        </a>
                        <i class="fas fa-heart"></i> <span>5</span>
                    </div>
                </section>
                <section class="myPet">
                    <h3>Name: Pesho</h3>
                    <p>Category: Cat</p>
                    <p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
                    <p class="description">This is my cat Pesho</p>
                    <div class="pet-info">
                        <a href="#">
                            <button class="button">Details</button>
                        </a>
                        <a href="#">
                            <button class="button">Delete</button>
                        </a>
                        <i class="fas fa-heart"></i> <span>5</span>
                    </div>
                </section>
            </ul>
        </section>`;
}

export async function myProfilePage(ctx) {
    let pets = [];

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                showMessage("loading", 'Loading...');
                await del(`/data/pets/${id}`);
                await showMessage("info", "Pet removed successfully!");
                ctx.page.redirect('/my-pets');
            } catch (err) {
                if (err.message) showMessage("err", err.message);
                else showMessage("err", err);
            }
        }
    }

    try {
        pets = await get(`/data/pets?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template({pets, onDelete}));
}