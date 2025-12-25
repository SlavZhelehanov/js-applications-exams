import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="./images/Lorde.jpg">
                </div>
                <div class="albumInfo">
                    <div class="albumText">
                        <h1>Name: Melodrama</h1>
                        <h3>Artist: Lorde</h3>
                        <h4>Genre: Pop Music</h4>
                        <h4>Price: $7.33</h4>
                        <h4>Date: June 16, 2017</h4>
                        <p>Description: Melodrama is the second studio album by New Zealand singer-songwriter Lorde.
                            It was released on 16 June 2017 by Lava and Republic Records and distributed through
                            Universal.</p>
                    </div>
                    <!-- Only for registered user and creator of the album-->
                    <div class="actionBtn">
                        <a href="#" class="edit">Edit</a>
                        <a href="#" class="remove">Delete</a>
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}