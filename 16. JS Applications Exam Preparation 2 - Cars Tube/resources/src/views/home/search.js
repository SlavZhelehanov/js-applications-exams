import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(onSearch, data) {
    return html`
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">
                ${0 < data.length
                        ? data.map(s => html`<div class="listing">
                    <div class="preview">
                        <img src=${s.imageUrl}>
                    </div>
                    <h2>${s.brand} ${s.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${s.year}</h3>
                            <h3>Price: ${s.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${s._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>`)
                        : html`<p class="no-cars"> No results.</p>`
                }
            </div>
        </section>`;
}

export async function searchPage(ctx) {
    const item = ctx.querystring.split('=')[1];
    let data = '';

    try {
        if (item && 0 < item.length) data = await get(`/data/cars?where=year%3D${item}`);
        console.log(data);
    } catch (err) {
        alert(err.message);
    }

    async function onSearch(e) {
        e.preventDefault();

        const query = document.getElementById('search-input').value;

        if (query.trim() === '') return alert('All fields are required!');

        ctx.page.redirect(`/search?query=${query}`);
    }

    ctx.render(template(onSearch, data));
}