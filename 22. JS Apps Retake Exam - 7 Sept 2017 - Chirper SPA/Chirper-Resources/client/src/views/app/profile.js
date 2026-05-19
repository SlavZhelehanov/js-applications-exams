import { html } from "../../lib/lit-html.min.js";
import { get, post } from "../../utils/api.js";
import { calcTime, getUserData } from "../../utils/utils.js";

function template({ user, data, isFollowing, changeOpinion }) {
    return html`<section id="viewProfile">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">${user?.username}</h2>
                
                ${isFollowing
            ? html`<a id="btnFollow" class="chirp-author" @click=${() => changeOpinion(false)} href="javascript():void">Unfollow</a>`
            : html`<a id="btnFollow" class="chirp-author" @click=${() => changeOpinion(true)} href="javascript():void">Follow</a>`
        }
                

                <div id="userProfileStats" class="user-details">
                    <span>${user?.chirps?.length || 0} chirps</span> | <span>${user?.following?.length || 0} following</span> | <span>${user?.followers?.length || 0} followers</span>
                </div>
            </div>
            <div id="profileChirps" class="chirps"><h2 class="titlebar">Chirps</h2>
            ${0 < data.length
            ? data.map(ch => html`<article class="chirp">
                    <div class="titlebar">
                        <a href="#" class="chirp-author">${ch.author}</a>
                        <span class="chirp-time">${calcTime(ch.createdAt)} day</span>
                    </div>
                    <p>${ch.text}</p>
                </article>`)
            : null
        }                
            </div>
        </div>
    </section>`;
}

export async function profiePage(ctx) {
    const { id } = ctx.params, { username } = getUserData();
    let data = [], user = '', isFollowing = false;

    async function changeOpinion(op) {
        try {
            await post(`/auth/${id}/opinion`, { op });
            return ctx.page.redirect(`/profile/${id}`);
        } catch (error) {
            alert(error);
        }
    }

    try {
        data = await get(`/chirps/${id}/users-chirps`);
        user = await get(`/auth/${id}`);
        isFollowing = user?.followers.includes(username);
        // console.log(data);
        // console.log(username);
        // console.log(user);
    } catch (error) {
        if (error.message) alert(error.message);
        else alert(error);
    }

    return ctx.render(template({ user, data, isFollowing, changeOpinion }));
}