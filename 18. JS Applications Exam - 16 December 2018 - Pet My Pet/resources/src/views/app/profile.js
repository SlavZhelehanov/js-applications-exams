import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section class="my-pets">
            <h1>My Pets</h1>
            <ul class="my-pets-list">
                <section class="myPet">
                    <h3>Name: Pesho</h3>
                    <p>Category: Cat</p>
                    <p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
                    <p class="description">This is my cat Pesho</p>
                    <div class="pet-info">
                        <a href="#">
                            <button class="button">Details</button>
                        </a>
                        <a href="#">
                            <button class="button">Delete</button>
                        </a>
                        <i class="fas fa-heart"></i> <span>5</span>
                    </div>
                </section>
                <section class="myPet">
                    <h3>Name: Pesho</h3>
                    <p>Category: Cat</p>
                    <p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
                    <p class="description">This is my cat Pesho</p>
                    <div class="pet-info">
                        <a href="#">
                            <button class="button">Details</button>
                        </a>
                        <a href="#">
                            <button class="button">Delete</button>
                        </a>
                        <i class="fas fa-heart"></i> <span>5</span>
                    </div>
                </section>
                <section class="myPet">
                    <h3>Name: Pesho</h3>
                    <p>Category: Cat</p>
                    <p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
                    <p class="description">This is my cat Pesho</p>
                    <div class="pet-info">
                        <a href="#">
                            <button class="button">Details</button>
                        </a>
                        <a href="#">
                            <button class="button">Delete</button>
                        </a>
                        <i class="fas fa-heart"></i> <span>5</span>
                    </div>
                </section>
            </ul>
        </section>`;
}

export async function myProfilePage(ctx) {
    ctx.render(template());
}