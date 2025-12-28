import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(onSearch, data, isLoggedIn) {
    return html`
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            
            <div class="search-result">
                ${0 < data.length
        ? data.map(a => html`<div class="card-box">
                    <img src=${a.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${a.name}</p>
                            <p class="artist">Artist: ${a.artist}</p>
                            <p class="genre">Genre: ${a.genre}</p>
                            <p class="price">Price: $${a.price}</p>
                            <p class="date">Release Date: ${a.releaseDate}</p>
                        </div>
                        ${isLoggedIn
            ? html`<div class="btn-group">
                            <a href="/details/${a._id}" id="details">Details</a>
                        </div>`
            : null
        }                        
                    </div>
                </div>`)
        : html`<p class="no-result">No result.</p>`
    }                
            </div>
        </section>`
}

export async function searchPage(ctx) {
    const item = ctx.querystring.split('=')[1], isLoggedIn = !!ctx.userData;
    let data = '';

    try {
        if (item && 0 < item.length) data = await get(`/data/albums?where=name%20LIKE%20%22${item}%22`);
    } catch (err) {
        alert(err.message);
    }

    async function onSearch(e) {
        e.preventDefault();

        const query = document.getElementById('search-input').value;

        if (query.trim() === '') return alert('All fields are required!');

        ctx.page.redirect(`/search?query=${query}`);
    }

    ctx.render(template(onSearch, data, isLoggedIn));
}