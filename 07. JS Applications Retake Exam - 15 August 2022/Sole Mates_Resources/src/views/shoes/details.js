import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(shoe) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <p id="details-title">Shoe Details</p>
                <div id="img-wrapper">
                    <img src=${shoe.imageUrl} alt="example1"/>
                </div>
                <div id="info-wrapper">
                    <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
                    <p>
                        Model: <span id="details-model">${shoe.model}</span>
                    </p>
                    <p>Release date: <span id="details-release">${shoe.release}</span></p>
                    <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
                    <p>Value: <span id="details-value">${shoe.value}</span></p>
                </div>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href="" id="edit-btn">Edit</a>
                    <a href="" id="delete-btn">Delete</a>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let shoe = {};

    try {
        shoe = await get(`/data/shoes/${id}`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(shoe));
}