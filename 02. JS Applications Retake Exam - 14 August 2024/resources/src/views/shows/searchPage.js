import {html} from "../../../node_modules/lit-html/lit-html.js";

import {searchShow} from '../../services/showsService.js';
import {getUserData} from '../../utils/utils.js';

function searchTemplate (shows, onSearch) {
    return html`
    <section id="search">
        <div class="form">
            <h2>Search</h2>
            <form class="search-form">
                <input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder='Type title'
                />
                <button @click=${onSearch} class="button-list">Search</button>
            </form>
        </div>
        <h4>Results:</h4>

        ${shows !== undefined ? html`
            <div class="search-result">
                ${shows.length === 0 ? html`
                            <p class="no-result">There is no TV show with this title</p>` :
        shows.map(p => html`
                            <div class="show">
                                <img src="${p.imageUrl}" alt="example1"/>
                                <h3 class="title">${p.title}</h3>
                                <p class="genre">Genre: ${p.genre}</p>
                                <p class="country-of-origin">Country of Origin: ${p.country}</p>
                                <a class="details-btn" href="/details/${p._id}">Details</a>
                            </div>`)
    }
            </div>
        ` : ''}
    </section>
`;
}

export async function searchPage(ctx) {
    let user = getUserData(ctx.user);
    console.log(user);
    let shows = undefined;
    const title = ctx.querystring.split('=')[1];

    if (title !== undefined) shows = await searchShow(title);
    console.log(shows);
    ctx.render(searchTemplate(shows, onSearch, user));

    async function onSearch() {
        const query = document.querySelector('#search-input').value;
        if (query.trim() === '') return alert('All fields are required!');

        ctx.page.redirect(`/search?query=${query}`);
    }
}