import {html} from '../../lib/lit-html.min.js';
import {searchFruit} from "../../services/fruitsService.js";

function template(fruits, onSearch) {
    return html`
        <section id="search">
            <div class="form">
                <h2>Search</h2>
                <form class="search-form">
                    <input
                            type="text"
                            name="search"
                            id="search-input"
                    />
                    <button @click=${onSearch} class="button-list">Search</button>
                </form>
            </div>
            <h4>Results:</h4>
            ${fruits !== undefined
                    ? html`
                        <div class="search-result">
                            ${fruits.length === 0 
                                    ? html`<p class="no-result">No result.</p>` 
                                    : fruits.map(p => html`
                                        <div class="fruit">
                                            <img src="${p.imageUrl}" alt="example1"/>
                                            <h3 class="title">${p.name}</h3>
                                            <p class="description">${p.description}</p>
                                            <a class="details-btn" href="/details/${p._id}">More Info</a>
                                        </div>`)
                            }
                        </div>
                    ` : ''
            }
        </section>
    `
}

export async function searchPage(ctx) {
    const fruit = ctx.querystring.split('=')[1];
    let fruits = '';

    if (fruit && 0 < fruit.length) fruits = await searchFruit(fruit.trim());

    async function onSearch() {
        const query = document.querySelector('#search-input').value;

        if (query.trim() === '') return alert('All fields are required!');

        ctx.page.redirect(`/search?query=${query}`);
    }

    ctx.render(template(fruits, onSearch));
}