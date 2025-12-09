import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(item) {
    return html`
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${item.title}</h3>
                <p class="type">Type: ${item.type}</p>
                <p class="img"><img src=${item.imageUrl}></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    <a class="button" href="#">Edit</a>
                    <a class="button" href="#">Delete</a>

                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <a class="button" href="#">Like</a>

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${item.description}</p>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, isAuth = !!ctx.userData;
    let item = {};

    try {
        item = await get(`/data/books/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item));
}