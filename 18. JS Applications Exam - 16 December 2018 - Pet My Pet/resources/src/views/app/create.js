import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template(onCreate) {
    return html`">
    <form @submit=${onCreate}>
        <fieldset>
            <legend>Add new Pet</legend>
            <p class="field">
                <label for="name">Name</label>
                <span class="input">
                                <input type="text" name="name" id="name" placeholder="Name"/>
                                <span class="actions"></span>
                            </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                                <textarea rows="4" cols="45" type="text" name="description" id="description"
                                          placeholder="Description"></textarea>
                                <span class="actions"></span>
                            </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                                <input type="text" name="imageURL" id="image" placeholder="Image"/>
                                <span class="actions"></span>
                            </span>
            </p>
            <p class="field">
                <label for="category">Category</label>
                <span class="input">
                                <select type="text" name="category">
                                    <option>Cat</option>
                                    <option>Dog</option>
                                    <option>Parrot</option>
                                    <option>Reptile</option>
                                    <option>Other</option>
                                </select>
                                <span class="actions"></span>
                            </span>
            </p>
            <input class="button" type="submit" class="submit" value="Add Pet"/>
        </fieldset>
    </form>
    </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            name: formData.get('name').trim(),
            description: formData.get('description').trim(),
            imageURL: formData.get('imageURL').trim(),
            category: formData.get('category').trim()
        }

        // if (Object.values(item).some((x) => !x)) return alert("All fields are required!");
        // if(item.title.length < 6) return showMessage( "err",'The title should be at least 6 characters long');
        // if(item.artist.length < 3) return showMessage( "err",'The artist should be at least 3 characters long');
        // if(!item.imageURL.startsWith('http://') && !item.imageURL.startsWith('https://')) return showMessage( "err",'The image should start with http:// or https://');

        try {
            await post("/data/pets", { ...item, likes: 0 });
            await showMessage("info", 'Pet created.');
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    ctx.render(template(onCreate));
}