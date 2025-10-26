import {html} from '../../../node_modules/lit-html/lit-html.js';
import {getAllShows} from '../../services/showsService.js';

function dashboardTemplate(shows) {
    return html`
        ${shows.length > 0
                ? html`
                    <h2>Users Recommendations</h2>
                    <section id="shows">
                        ${shows.map(showsTemplate)}
                    </section>
                `
                : html`
                    <h2 id="no-show">No shows Added.</h2>
                `
        }
    `;
}

function showsTemplate(show) {
    return html`
        <div class="show">
            <img src=${show.imageUrl} alt="example1"/>
            <div class="show-info">
                <h3 class="title">${show.title}</h3>
                <p class="genre">Genre: ${show.genre}</p>
                <p class="country-of-origin">Country of Origin: ${show.country}</p>
                <a class="details-btn" href="/details/${show._id}">Details</a>
            </div>
        </div>
    `;
}

export async function dashboardPage(ctx) {
    const shows = await getAllShows();

    ctx.render(dashboardTemplate(shows));
}
