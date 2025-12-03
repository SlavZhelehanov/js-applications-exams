import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
    return html`
        <section id="welcome-world">
            <div class="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero">

            <div id="home-page">
                <h1>Latest Games</h1>

                ${0 < data.length
            ? data.map(g => html`<div class="game">
                    <div class="image-wrap">
                        <img src=${g.imageUrl}>
                    </div>
                    <h3>${g.title}</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <a href="/details/${g._id}" class="btn details-btn">Details</a>
                    </div>
                </div>`)
            : html`<p class="no-articles">No games yet</p>`
        }
            </div>
        </section>`;
}

export async function homePage(ctx) {
    let data = [];

    try {
        data = await get(`/data/games?sortBy=_createdOn%20desc&distinct=category`);
    } catch (error) {
        alert(error.message);
    }
    ctx.render(template(data));
}