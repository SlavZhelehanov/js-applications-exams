import {html} from '../../../node_modules/lit-html/lit-html.js';
import {createSubmitHandler} from '../../utils/utils.js';
import {createShow} from '../../services/showsService.js';

function createTemplate(onCreate) {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Show</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="TV Show title"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="imageUrl"
                            placeholder="Image URL"
                    />
                    <input
                            type="text"
                            name="genre"
                            id="genre"
                            placeholder="Genre"
                    />
                    <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Country"
                    />
                    <textarea
                            id="details"
                            name="details"
                            placeholder="Details"
                            rows="2"
                            cols="10"
                    ></textarea>
                    <button type="submit">Add Show</button>
                </form>
            </div>
        </section>
    `;
}

export function createPage(ctx) {
    async function onCreate({title, imageUrl, genre, country, details}) {
        if ([title, imageUrl, genre, country, details].some((el) => el === '')) {
            return console.log('All fields are required');
        }

        await createShow({title, imageUrl, genre, country, details});

        ctx.page.redirect('/shows');
    }

    ctx.render(createTemplate(createSubmitHandler(onCreate)));
}