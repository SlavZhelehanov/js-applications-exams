import {html} from '../../../node_modules/lit-html/lit-html.js';
import {getUserData} from '../../utils/utils.js';
import {getById} from '../../services/showsService.js';

function detailsTemplate(show, onDelete) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${show.imageUrl} alt="example1"/>
                <div id="details-text">
                    <p id="details-title">${show.title}</p>
                    <div id="info-wrapper">
                        <div id="description">
                            <p id="details-description">${show.description}</p>
                        </div>
                    </div>
                    ${show.isCreator
                            ? html`
                                <div class="action-buttons">
                                    <a href="/shows/${show._id}/edit" id="edit-btn">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                </div>
                            `
                            : null
                    }
                </div>
            </div>
        </section>
    `;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const userData = getUserData();

    if (userData && userData._id === item._ownerId) item.isCreator = true;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            ctx.page.redirect('/shows');
        }
    }

    ctx.render(detailsTemplate(item, onDelete));
}