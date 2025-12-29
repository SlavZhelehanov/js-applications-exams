import {html} from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(item, isCreator) {
    return html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${item.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">
                        <h1>Name: ${item.name}</h1>
                        <h3>Artist: ${item.artist}</h3>
                        <h4>Genre: ${item.genre}</h4>
                        <h4>Price: $${item.price}</h4>
                        <h4>Date: ${item.releaseDate}</h4>
                        <p>Description: ${item.description}</p>
                    </div>
                    <!-- Only for registered user and creator of the album-->
                    <div class="actionBtn">
                        ${isCreator
                                ? html`<a href="/edit/${item._id}" class="edit">Edit</a>
                                <a href="#" class="remove">Delete</a>`
                                : null
                        }
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {}, isCreator = false;

    try {
        item = await get(`/data/albums/${id}`);

        if (item._ownerId === ctx.userData.id) isCreator = true;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isCreator));
}