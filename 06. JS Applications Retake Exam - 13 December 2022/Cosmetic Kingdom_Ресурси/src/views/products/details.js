import {html} from '../../lib/lit-html.min.js';
import {get} from '../../utils/api.js';

function template(product) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img
                        id="details-img"
                        src=${product.imageUrl}
                        alt="example1"
                />
                <p id="details-title">${product.name}</p>
                <p id="details-category">
                    Category: <span id="categories">${product.category}</span>
                </p>
                <p id="details-price">
                    Price: <span id="price-number">${product.price}</span>$
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Bought: <span id="buys">0</span> times.</h4>
                        <span>${product.description}</span>
                    </div>
                </div>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href="" id="edit-btn">Edit</a>
                    <a href="" id="delete-btn">Delete</a>

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="" id="buy-btn">Buy</a>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id
    let product = {};

    try {
        product = await get(`/data/products/${id}`);
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(product));
}