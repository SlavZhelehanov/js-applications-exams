import {html} from '../../lib/lit-html.min.js';

function template(songs, onDelete, onListen) {
    return html`
        <section class="detailsMyPet">
            <h3>Koko</h3>
            <p>Pet counter: <i class="fas fa-heart"></i> 6</p>
            <p class="img"><img src="https://www.freepngimg.com/thumb/parrot/2-parrot-png-images-download-thumb.png">
            </p>
            <form action="#" method="POST">
                <textarea type="text" name="description">This is my parrot Koko</textarea>
                <button class="button"> Save</button>
            </form>
        </section>
        <section class="detailsOtherPet">
            <h3>Spirit</h3>
            <p>Pet counter: 7 <a href="#">
                <button class="button"><i class="fas fa-heart"></i>
                    Pet
                </button>
            </a>
            </p>
            <p class="img"><img src="http://pngimg.com/uploads/horse/horse_PNG321.png"></p>
            <p class="description">This is my horse Spirit</p>
        </section>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}