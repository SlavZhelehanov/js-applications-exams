import {html} from "../../lib/lit-html.min.js";
import {get, del} from "../../utils/api.js";

function template({data, onDelete, isAuth}) {
    return html`
        <div id="meme-feed">
            <h1>Meme Feed</h1>
            <div id="memes">
                ${0 < data.length
                        ? data.map(m => html`
                            <div class="meme">
                                <a href="/details/${m._id}" class="meme-title">${m.title}</a>
                                <br>
                                <a href="/details/${m._id}"><img class="meme-image" src=${m.imageUrl}></a>
                                <div class="info">
                                    <div id="data-buttons">
                                        <a href="/details/${m._id}" class="custom-button">Check Out</a>
                                        ${isAuth
                                                ? html`<a href="/edit/${m._id}" class="custom-button">Edit</a>
                                                <a @click=${() => onDelete(m._id)} href="javascript:void(0)"
                                                   class="custom-button">Delete</a>`
                                                : null
                                        }
                                        <a href="/edit/${m._id}" class="custom-button">Edit</a>
                                        <a @click=${() => onDelete(m._id)} href="javascript:void(0)"
                                           class="custom-button">Delete</a>
                                        <a href="#" class="creator">Creator: ${m.creator}</a>
                                    </div>
                                </div>
                                <hr>
                            </div>`)
                        : html`<p class="no-memes">No memes in database.</p>`
                }
            </div>
        </div>`;
}

export async function dashboardPage(ctx) {
    const isAuth = !!ctx.userData;
    let data = [];

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/memes/${id}`);
                ctx.page.redirect('/app');
            } catch (err) {
                alert(err.message);
            }
        }
    }

    try {
        data = await get('/data/memes?sortBy=_createdOn%20desc');
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({data, isAuth, onDelete}));
}