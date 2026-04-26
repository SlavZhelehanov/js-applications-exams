import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
    <section id="viewProfile">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">SoftUni</h2>

                <a id="btnFollow" class="chirp-author" href="#">Follow</a>

                <div id="userProfileStats" class="user-details">
                    <span>1 chirps</span> | <span>0 following</span> | <span>2 followers</span>
                </div>
            </div>
            <div id="profileChirps" class="chirps"><h2 class="titlebar">Chirps</h2>
                <article class="chirp">
                    <div class="titlebar">
                        <a href="#" class="chirp-author">SoftUni</a>
                        <span class="chirp-time">1 day</span>
                    </div>
                    <p>First place at OIB startup weekend!</p>
                </article>
            </div>
        </div>
    </section>`;
}

export async function profilePage(ctx) {
    const isAuth = !!ctx.userData;
    return ctx.render(template());
}