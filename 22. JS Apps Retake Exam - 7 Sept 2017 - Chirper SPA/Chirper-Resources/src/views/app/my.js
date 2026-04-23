import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
    <section id="viewMe">
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
                <div class="chirp"><span class="loading">No chirps in database</span></div>
            </div>
        </div>
    </section>`;
}

export async function myPage(ctx) {
    const isAuth = !!ctx.userData;
    return ctx.render(template());
}