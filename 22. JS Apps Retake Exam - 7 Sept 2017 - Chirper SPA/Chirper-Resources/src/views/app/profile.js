import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { calcTime } from "../../utils/utils.js";

function template({ user }) {
    return html`
    <section id="viewProfile">
        <div class="content">
            <div class="chirper">
                <h2 class="titlebar">${user.username}</h2>

                <a id="btnFollow" class="chirp-author" href="#">Follow</a>

                <div id="userProfileStats" class="user-details">
                    <span>${user.chirps.length} chirps</span> | <span>${user.following.length} following</span> | <span>${user.followers.length} followers</span>
                </div>
            </div>
            <div id="profileChirps" class="chirps"><h2 class="titlebar">Chirps</h2>
                ${0 < user.chirps.length
            ? user.chirps.map(ch => html`<article class="chirp">
                    <div class="titlebar">
                        <a href="/profile/${ch.author}" class="chirp-author">${ch.author}</a>
                        <span class="chirp-time">${calcTime(ch.createdAt)}</span>
                    </div>
                    <p>${ch.text}</p>
                </article>`)
            : null
        }                
            </div>
        </div>
    </section>`;
}

export async function profilePage(ctx) {
    const isAuth = ctx.userData, { username } = ctx.params;
    let user = {};

    try {
        const users = await get(`/jsonstore/users/`);
        Object.keys(users).forEach(u => {
            if (users[u].username === username) user = users[u];
        });        
    } catch (error) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(template({ user }));
}