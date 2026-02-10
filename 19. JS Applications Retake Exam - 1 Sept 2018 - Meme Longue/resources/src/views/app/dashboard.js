import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <div id="meme-feed">
            <h1>Meme Feed</h1>
            <div id="memes">
                <div class="meme">
                    <a href="#" class="meme-title">Разбираемо...</a>
                    <br>
                    <a href="#"><img class="meme-image" src="https://scontent.fsof3-1.fna.fbcdn.net/v/t1.0-9/31924539_2110321352572189_5652160133854134272_n.jpg?_nc_cat=0&oh=dc73aad9af411f76454dd70ea1ab2775&oe=5C2FB35A"></a>
                    <div class="info">

                        <div id="data-buttons">
                            <a href="#" class="custom-button">Check Out</a>
                            <a href="#" class="custom-button">Edit</a>
                            <a href="#" class="custom-button">Delete</a>
                            <a href="#" class="creator">Creator: User</a>
                        </div>
                    </div>
                    <hr>
                </div>

                <p class="no-memes">No memes in database.</p>

            </div>
        </div>`;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}