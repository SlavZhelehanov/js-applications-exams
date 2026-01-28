import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template(data) {
    return html`
        <section class="dashboard">
            <h1>Dashboard</h1>
            <nav class="navbar">
                <ul>
                    <li><a href="#">All</a></li>
                    <li><a href="#">Cats</a></li>
                    <li><a href="#">Dogs</a></li>
                    <li><a href="#">Parrots</a></li>
                    <li><a href="#">Reptiles</a></li>
                    <li><a href="#">Other</a></li>
                </ul>
            </nav>
            ${0 < data.length
                    ? html`
                        <ul class="other-pets-list">${data.map(pet => html`
                            <li class="otherPet">
                                <h3>Name: ${pet.name}</h3>
                                <p>Category: ${pet.category}</p>
                                <p class="img"><img src=${pet.imageURL}></p>
                                <p class="description">${pet.description}</p>
                                <div class="pet-info">
                                    <a href="#">
                                        <button class="button"><i class="fas fa-heart"></i> Pet</button>
                                    </a>
                                    <a href="#">
                                        <button class="button">Details</button>
                                    </a>
                                    <i class="fas fa-heart"></i> <span> ${pet.likes}</span>
                                </div>
                            </li>`)}`
                    : html`<h2>There are no pets yet!</h2>`
            }
        </section>`;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get('/data/pets?sortBy=_createdOn%20desc');
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template(data));
}