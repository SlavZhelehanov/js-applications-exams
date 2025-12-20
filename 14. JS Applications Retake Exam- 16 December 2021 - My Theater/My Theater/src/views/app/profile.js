import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(data, email) {
    return html`
        <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${email}</h2>
            </div>
            <div class="board">
                ${0 < data.length
            ? data.map(e => html`<div class="eventBoard">
                        <div class="event-info">
                        <img src=${e.imageUrl}>
                        <h2>${e.title}</h2>
                        <h6>${e.date}</h6>
                        <a href="/details/${e.imageUrl}" class="details-button">Details</a>
                    </div>
                    </div>`)
            : html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`
        }
            </div>
        </section>`
}

export async function profilePage(ctx) {
    let data = [];

    try {
        data = await get(`/data/theaters?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data, ctx.userData.email));
}