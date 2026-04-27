import { html } from "../../lib/lit-html.min.js";
import { get, post } from "../../utils/api.js";

function template(onCreate) {
    return html`
    <section id="viewMe">
        <div class="content">
            <div class="chirper">

                <h2 class="titlebar">Pesho</h2>

                <form id="formSubmitChirpMy" class="chirp-form" method="post" @submit=${onCreate}>
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
    const isAuth = ctx.userData;

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const text = formData.get('text').trim();

        if (!text) return alert("All fields are required!");

        try {
            const users = await get("/jsonstore/users");
            let user = {};

            Object.keys(users).forEach(u => {                
                if (users[u].username === isAuth.username) user = users[u];
            });            

            await post("/jsonstore/chirps", { text, author: user.username });
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return ctx.render(template(onCreate));
}