import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template({data, onDetails, isAuth, showAll}) {
    return html`
        <section class="dashboard">
            <h1>Dashboard</h1>
            <nav class="navbar">
                <ul>
                    <li><a @click=${() => showAll()}>All</a></li>
                    <li><a @click=${() => showAll("Cat")}>Cats</a></li>
                    <li><a @click=${() => showAll("Dog")}>Dogs</a></li>
                    <li><a @click=${() => showAll("Parrot")}>Parrots</a></li>
                    <li><a @click=${() => showAll("Reptile")}>Reptiles</a></li>
                    <li><a @click=${() => showAll("Other")}>Other</a></li>
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
                                    ${!isAuth._id
                                            ? null
                                            : isAuth._id !== pet._ownerId
                                            ? html`
                                                <a href="#">
                                                    <button class="button"><i class="fas fa-heart"></i> Pet</button>
                                                </a>
                                                <a href="#">
                                                    <button class="button">Details</button>
                                                </a>`
                                                    : html`<a><button @click=${() => onDetails(m._id)} class="button">Details</button></a>`
                                    }
                                    <i class="fas fa-heart"></i> <span> ${pet.likes}</span>
                                </div>
                            </li>`)}`
                    : html`<h2>There are no pets yet!</h2>`
            }
        </section>`;
}

export async function dashboardPage(ctx) {
    const isAuth = ctx.userData, petStorage = sessionStorage.getItem("pet");
    let data = [];

    function showAll(pet = false) {
        if (pet) sessionStorage.setItem("pet", pet);
        else sessionStorage.removeItem("pet");
        ctx.page.redirect("/app");
    }

    function onDetails(id) {
        ctx.page.redirect(`/details/${id}`);
    }

    try {
        data = await get('/data/pets?sortBy=_createdOn%20desc');

        if (petStorage) data = data.filter(p => p.category === petStorage);
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template({data, onDetails, isAuth, showAll}));
}