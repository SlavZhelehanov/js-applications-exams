import {html} from "../../lib/lit-html.min.js";
import {getAllFruits} from "../../services/fruitsService.js";

function template(fruits) {
    return html`
        ${0 < fruits.length
                ? html`
                    <h2>Fruits</h2>
                    <section id="dashboard">
                        ${fruits.map(fruit => html`
                            <div class="fruit">
                                <img src=${fruit.imageUrl} alt="example1"/>
                                <h3 class="title">${fruit.name}</h3>
                                <p class="description">${fruit.description}</p>
                                <a class="details-btn" href="/details/${fruit._id}">More Info</a>
                            </div>
                        `)}
                    </section>`
                : html` <h2>No fruit info yet.</h2>`
        }
    `;
}

export async function dashboardPage(ctx) {
    const fruits = await getAllFruits();

    ctx.render(template(fruits));
}