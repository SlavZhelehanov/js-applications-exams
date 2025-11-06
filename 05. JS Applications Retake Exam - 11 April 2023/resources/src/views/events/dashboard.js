import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";

function template(events) {
    return html`
        <h2>Current Events</h2>
        ${0 < events.length
                ? html`
                    <section id="dashboard">${events.map(e => html`
                        <div class="event">
                            <img src=${e.imageUrl} alt="example1"/>
                            <p class="title">${e.name}</p>
                            <p class="date">${e.date}</p>
                            <a class="details-btn" href="/details/${e._id}">Details</a>
                        </div>`)}
                    </section>`
                : html`<h4>No Events yet.</h4>`
        }`;
}

export async function dashboardPage(ctx) {
    let events = [];

    try {
        events = await get("/data/events?sortBy=_createdOn%20desc");
    } catch (err) {
        return alert(err.message);
    }
    ctx.render(template(events));
}