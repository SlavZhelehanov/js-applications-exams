import {html} from "../../../node_modules/lit-html/lit-html.js";
import {createSubmitHandler} from "../../utils/utils.js";
import {getById, updateShow} from "../../services/showsService.js";

function editTemplate(show, onEdit) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Show</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="TV Show title"
                            value=${show?.title}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="imageUrl"
                            placeholder="Image URL"
                            value=${show?.imageUrl}
                    />
                    <input
                            type="text"
                            name="genre"
                            id="genre"
                            placeholder="Genre"
                            value=${show?.genre}
                    />
                    <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Country"
                            value=${show?.country}
                    />
                    <textarea
                            id="details"
                            name="details"
                            placeholder="Details"
                            rows="2"
                            cols="10"
                    >${show?.details}</textarea>
                    <button type="submit">Edit Show</button>
                </form>
            </div>
        </section>
    `;
}

export async function editPage(ctx) {
    const id = ctx.params.id;
    const show = await getById(id);

    async function onEdit({title, imageUrl, genre, country, details}) {
        if ([title, imageUrl, genre, country, details].some((el) => el === "")) {
            return console.log("All fields are required");
        }

        await updateShow(id, {title, imageUrl, genre, country, details});

        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(show, createSubmitHandler(onEdit)));
}
