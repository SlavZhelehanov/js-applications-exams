import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <div class="listing-details">
            <div class="my-listing-details">
                <p id="auto-title">Audi a3 много запазено</p>
                <img src="https://i.imgur.com/drIOsYl.jpg">
                <div class="listing-props">
                    <h2>Brand: Audi</h2>
                    <h3>Model: a3</h3>
                    <h3>Year: 1998</h3>
                    <h3>Fuel: Gasoline</h3>
                    <h3>Price: 2500$</h3>
                </div>
                <div class="listings-buttons">

                    <a href="#" class="button-list">Edit</a>
                    <a href="#" class="button-list">Delete</a>


                </div>
                <p id="description-title">Description:</p>
                <p id="description-para">Не съм навъртал на колата 100000км в никакъв случай. Като нова е</p>

            </div>
        </div>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}