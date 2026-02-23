import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template({user, onDelete, memes}) {
    return html`
        <div class="user-profile">
            <img id="user-avatar-url" src=${user.avatarUrl} alt="user-profile">
            <h1>${user.username}</h1>
            <h2>${user.email}</h2>

            <p id="user-listings-title">User Memes</p>
            <div class="user-meme-listings">
                ${0 < memes.length
                        ? memes.map(m => html`
                            <div class="user-meme">
                                <a href="#" class="user-meme-title">${m.title}</a>
                                <a href=""> <img class="userProfileImage" src=${m.imageUrl}></a>
                                <div class="user-memes-buttons">
                                    <a href="/edit/${m._id}" class="user-meme-btn">Edit</a>
                                    <a @click=${() => onDelete(m._id)} href="javascript:void(0)" class="user-meme-btn">Delete</a>
                                </div>
                            </div>`)
                        : html`<p class="no-memes">No memes in database.</p>`
                }
            </div>
        </div>`;
}

export async function profilePage(ctx) {
    const user = ctx.userData;
    let memes = [];

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
        memes = await get(`/data/memes?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`);
        console.log(memes);

    } catch (err) {
        alert(err.message);
    }
    ctx.render(template({onDelete, user, memes}));
}