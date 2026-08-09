import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(data) {
    return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class="profile home-text col-md-6 text-center col-lg">
                <img class="profile-img" src="./images/user.png" />
                <div class="profile-info">
                    <p>Username: <small>${data.user.username}</small></p>
                    <p class="infoType">Has ${data.ideasInfo.count} ideas =)</p>
                    ${data.ideasInfo.count === 0
            ? html`<p>No ideas yet</p>`
            : data.ideasInfo.ideaNames.map(idea => html`<p>${idea}</p>`)
        }
                </div>
            </div>
        </div>`;
}

export async function myDataPage(ctx) {
    let data = {};

    try {
        data = await get("/app/profile");
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    ctx.render(template(data));
}