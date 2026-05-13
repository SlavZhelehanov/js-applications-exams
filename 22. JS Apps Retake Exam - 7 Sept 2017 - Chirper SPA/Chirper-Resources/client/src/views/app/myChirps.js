import { html } from "../../lib/lit-html.min.js";
import { get, post } from "../../utils/api.js";
import { calcTime } from "../../utils/utils.js";

function template({ data, chirps, onCreate, followers, following }) {
    return html`<section id="viewMe">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">Pesho</h2>

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
                                        <a href="#">delete</a>
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
        } catch (err) {
            alert(err.message);
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
        chirps: res.userData.chirps,
        following: res.userData.following,
        followers: res.userData.followers,
        onCreate
    }));
}