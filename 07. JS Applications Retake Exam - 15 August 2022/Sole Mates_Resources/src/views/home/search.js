import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(onSearch, shoes, isLoggedIn) {
    return html`
        <section id="search">
            <h2>Search by Brand</h2>

            <form class="search-wrapper cf">
                <input
                        id="#search-input"
                        type="text"
                        name="search"
                        placeholder="Search here..."
                        required
                />
                <button @click=${onSearch} type="submit">Search</button>
            </form>

            <h3>Results:</h3>

            <div id="search-container">
                ${0 < shoes.length
                        ? html`
                            <ul class="card-wrapper">
                                ${shoes.map(s => html`
                                    <li class="card">
                                        <img src=${s.imageUrl} alt="travis"/>
                                        <p>
                                            <strong>Brand: </strong><span class="brand">${s.brand}</span>
                                        </p>
                                        <p>
                                            <strong>Model: </strong><span class="model">${s.model}</span>
                                        </p>
                                        <p><strong>Value:</strong><span class="value">${s.value}</span>$</p>
                                        ${isLoggedIn && html`<a class="details-btn" href="/details/${s._id}">Details</a>`}
                                    </li>`)}                                
                            </ul>`
                        : html`<h2>There are no results found.</h2>`
                }
            </div>
        </section>
    `
}

export async function searchPage(ctx) {
    const shoe = ctx.querystring.split('=')[1], isLoggedIn = !!ctx.userData;
    let shoes = '';

    try {
        if (shoe && 0 < shoe.length) shoes = await get(`/data/shoes?where=brand%20LIKE%20%22${shoe.trim()}%22`);
    } catch (err) {
        alert(err.message);
    }

    async function onSearch(e) {
        e.preventDefault();

        const query = document.getElementById('#search-input').value;

        if (query.trim() === '') return alert('All fields are required!');

        ctx.page.redirect(`/search?query=${query}`);
    }

    ctx.render(template(onSearch, shoes, isLoggedIn));
}