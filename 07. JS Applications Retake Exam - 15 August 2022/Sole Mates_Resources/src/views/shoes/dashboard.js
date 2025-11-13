import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="dashboard">
            <h2>Collectibles</h2>
            <ul class="card-wrapper">
                <!-- Display a li with information about every post (if any)-->
                <li class="card">
                    <img src="./images/travis.jpg" alt="travis"/>
                    <p>
                        <strong>Brand: </strong><span class="brand">Air Jordan</span>
                    </p>
                    <p>
                        <strong>Model: </strong
                        ><span class="model">1 Retro High TRAVIS SCOTT</span>
                    </p>
                    <p><strong>Value:</strong><span class="value">2000</span>$</p>
                    <a class="details-btn" href="">Details</a>
                </li>
                <li class="card">
                    <img src="./images/back2future.webp" alt="back2future"/>
                    <p><strong>Brand: </strong><span class="brand">Nike</span></p>
                    <p>
                        <strong>Model: </strong
                        ><span class="model">Back To the Future Part II</span>
                    </p>
                    <p><strong>Value:</strong><span class="value">92100</span>$</p>
                    <a class="details-btn" href="">Details</a>
                </li>
                <li class="card">
                    <img src="./images/eminem.jpg" alt="eminem"/>
                    <p>
                        <strong>Brand: </strong><span class="brand">Air Jordan</span>
                    </p>
                    <p>
                        <strong>Model: </strong
                        ><span class="model">4 Retro CARHARTT X EMINEM</span>
                    </p>
                    <p><strong>Value:</strong><span class="value">30000</span>$</p>
                    <a class="details-btn" href="">Details</a>
                </li>
            </ul>

            <!-- Display an h2 if there are no posts -->
            <h2>There are no items added yet.</h2>
        </section>
    `;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}