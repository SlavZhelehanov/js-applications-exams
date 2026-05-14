import { html } from "../../lib/lit-html.min.js";
import { get, post, del } from "../../utils/api.js";
import { calcTime, getUserData } from "../../utils/utils.js";

function template({ data, chirps, onDelete, username, onCreate, followers, following }) {
    return html`<section id="viewMe">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">${username}</h2>

                <form id="formSubmitChirpMy" class="chirp-form" method="post" @submit=${onCreate}>
                    <textarea name="text" class="chirp-input"></textarea>
                    <input class="chirp-submit" id="btnSubmitChirpMy" value="Chirp" type="submit">
                </form>

                <div id="myStats" class="user-details">
                    <span>${chirps?.length || 0} chirps</span> | <span>${following?.length || 0} following</span> | <span>${followers?.length || 0} followers</span>
                </div>
            </div>
            <div id="myChirps" class="chirps">
                <h2 class="titlebar">Chirps</h2>
                ${0 < data.length
            ? data.map(ch => html`
                                        <article class="chirp">
                                    <div class="titlebar">
                                        <a href="/profile/${ch.author}" class="chirp-author">${ch.author}</a>
                                        <a @click=${() => onDelete(ch._id)} href="#">delete</a>
                                        <span class="chirp-time">${calcTime(ch.createdAt)}</span>
                                    </div>
                                    <p>${ch.text}</p>
                                </article>`)
            : html`<div class="chirp"><span class="loading">No chirps in database</span></div>`
        }                
            </div>
        </div>
    </section>`;
}

export async function myChirps(ctx) {
    const { username } = getUserData();
    let res = {};

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        // const item = {
        //     name: formData.get('name').trim(),
        //     imgUrl: formData.get('imgUrl').trim(),
        //     price: formData.get('price').trim(),
        //     releaseDate: formData.get('releaseDate').trim(),
        //     artist: formData.get('artist').trim(),
        //     genre: formData.get('genre').trim(),
        //     description: formData.get('description').trim()
        // }
        const text = formData.get('text').trim();

        // if (Object.values(item).some((x) => !x)) return alert("All fields are required!");
        if (!text || text.length === 0) return alert("All fields are required!");

        try {
            await post("/chirps", { text });
            e.target.reset();
            ctx.page.redirect('/chirps/me');
        } catch (error) {
            if (error.message) alert(error.message);
            else alert(error);
        }
    }

    async function onDelete(id) {
        if (!id) return;

        try {
            await del(`/chirps/${id}`);
            ctx.page.redirect('/chirps/me');
        } catch (error) {
            if (error.message) alert(error.message);
            else alert(error);
        }
    }

    try {
        res = await get('/chirps/me');
    } catch (error) {
        if (error.message) alert(error.message);
        else alert(error);
    }
    return ctx.render(template({
        data: res.chirps,
        onDelete,
        username,
        chirps: res.userData.chirps,
        following: res.userData.following,
        followers: res.userData.followers,
        onCreate
    }));
}