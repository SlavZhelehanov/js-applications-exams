import {html} from '../../../node_modules/lit-html/lit-html.js';
import {getById, deleteShow} from '../../services/showsService.js';

function detailsTemplate(show, onDelete) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${show.imageUrl} alt="example1"/>
                <div id="details-text">
                    <p id="details-title">${show.title}</p>
                    <div id="info-wrapper">
                        <div id="description">
                            <p id="details-description">${show.details}</p>
                        </div>
                    </div>
                    <div id="action-buttons">
                        ${show.isCreator
                                ? html`
                                    <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                `
                                : null
                        }
                    </div>
                </div>
            </div>
        </section>
    `;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const show = await getById(id);
    const userData = ctx.userData;

    console.log("userData: ", userData);

    if (userData && userData._id === show._ownerId) show.isCreator = true;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteShow(id);
            ctx.page.redirect('/shows');
        }
    }

    ctx.render(detailsTemplate(show, onDelete));
}