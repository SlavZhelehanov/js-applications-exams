import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: Moulin Rouge! - The Musical</h1>
                    <div>
                        <img src="./images/Moulin-Rouge!-The-Musical.jpg" />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>The Musical is a jukebox musical with a book by John Logan. The musical is based on the 2001 film
                        Moulin Rouge! directed by Baz Luhrmann and written by Luhrmann and Craig Pearce. The musical
                        premiered on July 10, 2018, at the Emerson Colonial Theatre in Boston.</p>
                    <h4>Date: July 10, 2018</h4>
                    <h4>Author: Baz Luhrmann, Craig Pearce</h4>
                    <div class="buttons">
                        <a class="btn-delete" href="#">Delete</a>
                        <a class="btn-edit" href="#">Edit</a>
                        <a class="btn-like" href="#">Like</a>
                    </div>
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}