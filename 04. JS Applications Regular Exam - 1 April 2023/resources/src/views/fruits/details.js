import {html} from '../../lib/lit-html.min.js';
import {deleteFruit, getById} from "../../services/fruitsService.js";

function template(fruit, isAuthor, onDelete) {
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
                        ${isAuthor
                                ? html`
                                    <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                ` : null
                        }
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getById(id);
    const isAuthor = ctx.userData && ctx.userData._id === fruit._ownerId;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteFruit(id);
            ctx.page.redirect('/fruits');
        }
    }

    ctx.render(template(fruit, isAuthor, onDelete));
}