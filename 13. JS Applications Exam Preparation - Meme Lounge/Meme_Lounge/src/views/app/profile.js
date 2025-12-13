import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";
import { showError } from '../../utils/utils.js';

function template(user, memes) {
    return html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender === 'male' ? 'male.png' : 'female.png'}">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${0 < memes.length
            ? memes.map(m => html`<div class="user-meme">
                    <p class="user-meme-title">${m.title}</p>
                    <img class="userProfileImage" alt="meme-img" src=${m.imageUrl}>
                    <a class="button" href="/details/${m._id}">Details</a>
                </div>`)
            : html`<p class="no-memes">No memes in database.</p>`
        } 
            </div>
        </section>
    `
}

export async function profilePage(ctx) {
    const user = ctx.userData;
    let memes = [];

    try {
        memes = await get(`/data/memes?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        showError(err.message);
    }

    ctx.render(template(user, memes));
}