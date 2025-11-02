import { html } from '../../lib/lit-html.min.js';
import {getById} from "../../services/fruitsService.js";

function template(fruit) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${fruit.imageUrl} alt="example1"/>
                <p id="details-title">${fruit.name}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p>${fruit.description}</p>
                        <p id="nutrition">Nutrition</p>
                        <p id="details-nutrition">${fruit.nutrition}</p>
                    </div>
                    <!--Edit and Delete are only for creator-->
                    <div id="action-buttons">
                        <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                        <a href="" id="delete-btn">Delete</a>
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getById(id);

    ctx.render(template(fruit));
}