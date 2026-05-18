import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template({ username, data }) {
    return html`<section id="viewProfile">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">Softuni</h2>

                <a id="btnFollow" class="chirp-author" href="#">Follow</a>

                <div id="userProfileStats" class="user-details">
                    <span>1 chirps</span> | <span>0 following</span> | <span>2 followers</span>
                </div>
            </div>
            <div id="profileChirps" class="chirps"><h2 class="titlebar">Chirps</h2>
            ${0 < data.length
            ? data.map(ch => html`<article class="chirp">
                    <div class="titlebar">
                        <a href="#" class="chirp-author">${ch.author}</a>
                        <span class="chirp-time">1 day</span>
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
    const { id } = ctx.params;
    let data = [], user = '';

    try {
        data = await get(`/chirps/${id}/users-chirps`);
        user = await get(`/auth/${id}`);
        console.log(data);
    } catch (error) {
        if (error.message) alert(error.message);
        else alert(error);
    }

    return ctx.render(template({ username: user.username, data }));
}