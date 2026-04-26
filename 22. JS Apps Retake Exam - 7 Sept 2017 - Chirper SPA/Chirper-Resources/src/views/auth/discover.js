import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { getisLogin } from "../../utils/utils.js";

function template(users) {
    return html`
        <section id="viewDiscover">
        <div class="content">
            <div class="chirps">
                <h2 class="titlebar">Discover</h2>
                <div id="userlist">
                    ${0 < users.length
            ? users.map(u => html`<div class="userbox">
                        <div><a href="/profile/${u._id}" class="chirp-author">${u.username}</a></div>

                        <div class="user-details">
                            <span>${u.followers} followers</span>
                        </div>
                    </div>`)
            : null
        }
                </div>
            </div>
        </div>
    </section>`;
}

export async function discoverPage(ctx) {
    const isAuth = ctx.userData, isLogin = getisLogin();
    let users = [];

    try {
        const data = await get('/jsonstore/users');
        Object.keys(data).forEach(id => {
            if (data[id].username !== isAuth.username) users.push({ username: data[id].username, _id: data[id]._id, followers: data[id].followers.length });
        });
    } catch (error) {
        if (err.message) alert(err.message);
        else alert(err);
    }
    return ctx.render(template(users));
}