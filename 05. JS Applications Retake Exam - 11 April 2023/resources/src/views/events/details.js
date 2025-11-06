import {html} from '../../lib/lit-html.min.js';
import {get, del, post} from '../../utils/api.js';

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

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, userId = ctx?.userData?._id;
    let event = {}, goings = 0, isCreator = false, isLoggedIn = !!userId, canGo = false;


    try {
        event = await get(`/data/events/${id}`);
        }
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(event, goings, isCreator, isLoggedIn, canGo, onDelete, goTo));
}