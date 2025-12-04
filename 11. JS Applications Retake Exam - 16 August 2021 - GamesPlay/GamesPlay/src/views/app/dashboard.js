import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
            <div class="allGames">
                <div class="allGames-info">
                    <img src="./images/avatar-1.jpg">
                    <h6>Action</h6>
                    <h2>Cover Fire</h2>
                    <a href="#" class="details-button">Details</a>
                </div>

            </div>
            <div class="allGames">
                <div class="allGames-info">
                    <img src="./images/avatar-1.jpg">
                    <h6>Action</h6>
                    <h2>Zombie lang</h2>
                    <a href="#" class="details-button">Details</a>
                </div>

            </div>
            <div class="allGames">
                <div class="allGames-info">
                    <img src="./images/avatar-1.jpg">
                    <h6>Action</h6>
                    <h2>MineCraft</h2>
                    <a href="#" class="details-button">Details</a>
                </div>
            </div>

            <!-- Display paragraph: If there is no games  -->
            <h3 class="no-articles">No articles yet</h3>
        </section>`;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}