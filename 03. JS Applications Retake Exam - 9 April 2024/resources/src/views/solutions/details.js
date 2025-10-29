import { html } from '../../../node_modules/lit-html/lit-html.js';
import {getById} from "../../services/solutionsService.js";

function template(item, isAuthor, isLogged) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${item.imageUrl} alt="example1"/>
                <div>
                    <p id="details-type">${item.type}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p id="description">${item.description}</p>
                            <p id="more-info">${item.learnMore}</p>
                        </div>
                    </div>
                    <h3>Like Solution:<span id="like">${item.likes ? item.likes : 0}</span></h3>

                    <!--Edit and Delete are only for creator-->
                    <div id="action-buttons">
                        ${isAuthor
                                ? html`<a href="/edit" id="edit-btn">Edit</a>
                                <a href="#" id="delete-btn">Delete</a>`
                                : isLogged
                                        ? html`<a href="#" id="like-btn">Like</a>`
                                        : null
                        }
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const isLogged = !!ctx.userData;
    const isAuthor = isLogged && ctx.userData._id === item._ownerId;
    ctx.render(template(item, isAuthor, isLogged));
}