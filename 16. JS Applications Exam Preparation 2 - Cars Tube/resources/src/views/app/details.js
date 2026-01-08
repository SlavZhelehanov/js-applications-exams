import { html } from '../../lib/lit-html.min.js';

function template(isOwner) {
    return html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="/images/audia3.jpg">
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>Audi</li>
                    <li><span>Model:</span>A3</li>
                    <li><span>Year:</span>2018</li>
                    <li><span>Price:</span>25000$</li>
                </ul>

                <p class="description-para">Some description of this car. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Sunt voluptate quam nesciunt ipsa veritatis voluptas optio debitis repellat porro
                    sapiente.</p>

                <div class="listings-buttons">
                    ${isOwner
                            ? html`<a href="#" class="button-list">Edit</a>
                            <a href="#" class="button-list">Delete</a>`
                            : null
                    }
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    let isOwner = false;

    ctx.render(template(isOwner));
}