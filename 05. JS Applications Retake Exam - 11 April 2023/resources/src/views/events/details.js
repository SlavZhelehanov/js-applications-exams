import {html} from '../../lib/lit-html.min.js';
import {get, del, post} from '../../utils/api.js';

function template(event, goings, isCreator, isLoggedIn, canGo, onDelete, goTo) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${event.imageUrl} alt="example1"/>
                <p id="details-title">${event.name}</p>
                <p id="details-category">Category: <span id="categories">${event.category}</span></p>
                <p id="details-date">Date:<span id="date">${event.date}</span></p>
                <div id="info-wrapper">
                    <div id="details-description"><span>${event.description}</span></div>
                </div>
                <h3>Going: <span id="go">${goings}</span> times.</h3>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    ${!isLoggedIn
                            ? null
                            : isCreator
                                    ? html`
                                        <a href="/edit/${event._id}" id="edit-btn">Edit</a>
                                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                    `
                                    : canGo === 0
                                            ? html`<a @click=${goTo} href="javascript:void(0)" id="go-btn">Going</a>`
                                            : null
                    }
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, userId = ctx?.userData?._id;
    let event = {}, goings = 0, isCreator = false, isLoggedIn = !!userId, canGo = false;


    try {
        event = await get(`/data/events/${id}`);
        goings = await get(`/data/going?where=eventId%3D%22${id}%22&distinct=_ownerId&count`);

        if (userId) {
            canGo = await get(`/data/going?where=eventId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
            isCreator = event._ownerId === userId;
        }
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(event, goings, isCreator, isLoggedIn, canGo, onDelete, goTo));
}