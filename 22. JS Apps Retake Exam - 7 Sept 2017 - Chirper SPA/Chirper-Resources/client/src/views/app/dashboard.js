import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
    return html`<section id="viewDiscover">
        <div class="content">
            <div class="chirps">
                <h2 class="titlebar">Discover</h2>
                <div id="userlist">
                ${0 < data.length
            ? data.map(usr => html`<div class="userbox">
                        <div><a href="/profile/${usr.userId}" class="chirp-author">${usr.username}</a></div>

                        <div class="user-details">
                            <span>${usr.followers.length} followers</span>
                        </div>
                    </div>`)
            : null
        }
                </div>
            </div>
        </div>
    </section>`;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get("/auth");
    } catch (error) {
        if (error.message) alert(error.message);
        else alert(error);
    }

    return ctx.render(template(data));
}