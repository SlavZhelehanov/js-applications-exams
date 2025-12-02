import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";

function template(item, isOwner, onDelete) {
    return html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${item.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${item.name}</h1>
                        <h3>Breed: ${item.breed}</h3>
                        <h4>Age: ${item.age}</h4>
                        <h4>Weight: ${item.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        ${isOwner
                                ? html`<a href="#" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                                : null
                        }
                        <!--(Bonus Part) Only for no creator and user-->
                        <a href="#" class="donate">Donate</a>
                    </div>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    let item = {}, isAuth = ctx.userData, isOwner = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/pets/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                alert(err.message);
            }
        }
    }

    try {
        item = await get(`/data/pets/${id}`);
        isOwner = isAuth && item._ownerId === ctx.userData._id;
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(item, isOwner, onDelete));
}