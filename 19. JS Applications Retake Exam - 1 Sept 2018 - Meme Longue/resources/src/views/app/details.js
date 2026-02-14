import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <div class="meme-details">
            <div class="my-meme-details">
                <a href="#" id="meme-title">Разбираемо...</a>
                <img src="https://scontent.fsof3-1.fna.fbcdn.net/v/t1.0-9/31924539_2110321352572189_5652160133854134272_n.jpg?_nc_cat=0&oh=dc73aad9af411f76454dd70ea1ab2775&oe=5C2FB35A">
                <div class="meme-props">
                    <h2>Description</h2>
                    <p class="meme-description">
                        И аз така...
                    </p>
                </div>

                <div class="meme-details-buttons">
                    <a class="meme-details-button" href="#">Created by User</a>
                    <a href="#" class="meme-details-button">Edit</a>
                    <a href="#" class="meme-details-button">Delete</a>
                </div>

            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}