import {html} from '../../lib/lit-html.min.js';
import {get, del} from "../../utils/api.js";

function template({user, onDelete, memes, isOwner}) {
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
                                <a href="/details/${m._id}" class="user-meme-title">${m.title}</a>
                                <a href="/my-profile/${m.creator}"> <img class="userProfileImage" src=${m.imageUrl}></a>
                                <div class="user-memes-buttons">
                                    ${isOwner
                                            ? html`<a href="/edit/${m._id}" class="user-meme-btn">Edit</a>
                                            <a @click=${() => onDelete(m._id)} href="javascript:void(0)"
                                               class="user-meme-btn">Delete</a>`
                                            : null
                                    }
                                </div>
                            </div>`)
                        : html`<p class="no-memes">No memes in database.</p>`
                }
            </div>
        </div>`;
}

export async function profilePage(ctx) {
    const userId = ctx.params.id, visitor = ctx.userData;
    let memes = [], user = {}, isOwner = false;

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
        isOwner = visitor._id === userId;
        user = isOwner ? visitor : await get(`/data/users/${userId}`);
        memes = await get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        console.log(memes);

    } catch (err) {
        alert(err.message);
    }
    ctx.render(template({onDelete, isOwner, user, memes}));
}