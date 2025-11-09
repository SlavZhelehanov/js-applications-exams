import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img
                        id="details-img"
                        src="./images/product example 1.png"
                        alt="example1"
                />
                <p id="details-title">Fond De Teint</p>
                <p id="details-category">
                    Category: <span id="categories">Skin care, Makeup</span>
                </p>
                <p id="details-price">
                    Price: <span id="price-number">23.99</span>$
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Bought: <span id="buys">0</span> times.</h4>
                        <span
                        >Fond De Teint (Foundation) is a liquid, cream, or powder
                  makeup applied to the face and neck to create an even, uniform
                  color to the complexion, cover flaws and, sometimes, to change
                  the natural skin tone. Some foundations also function as a
                  moisturizer, sunscreen, astringent or base layer for more
                  complex cosmetics. Foundation applied to the body is generally
                  referred to as "body painting" or "body makeup".</span
                        >
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
    ctx.render(template());
}