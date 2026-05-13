import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { calcTime } from "../../utils/utils.js";

function template({ data }) {
    return html`<section id="viewMe">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">Pesho</h2>

                <form id="formSubmitChirpMy" class="chirp-form">
                    <textarea name="text" class="chirp-input"></textarea>
                    <input class="chirp-submit" id="btnSubmitChirpMy" value="Chirp" type="submit">
                </form>

                <div id="myStats" class="user-details">
                    <span>0 chirps</span> | <span>1 following</span> | <span>0 followers</span>
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
                                    <p>yohooo</p>
                                </article>`)
            : html`<div class="chirp"><span class="loading">No chirps in database</span></div>`
        }                
            </div>
        </div>
    </section>`;
}

export async function myChirps(ctx) {
    let data = [];

    try {
        data = await get('/chirps/me');
    } catch (error) {
        if (error.message) alert(error.message);
        else alert(error);
    }
    return ctx.render(template({ data }));
}