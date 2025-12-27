import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data, isAuth) {
    return html`
        <section id="catalogPage">
            <h1>All Albums</h1>
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
                    ${isAuth
                            ? html`<div class="btn-group">
                        <a href="/details/${a._id}" id="details">Details</a>
                    </div>`
                            : null
                    }                    
                </div>
            </div>`)
                    : html`<p>No Albums in Catalog!</p>`
            }
        </section>`;
}

export async function dashboardPage(ctx) {
    let data = [], isAuth = !!ctx.userData;

    try {
        data = await get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data, isAuth));
}