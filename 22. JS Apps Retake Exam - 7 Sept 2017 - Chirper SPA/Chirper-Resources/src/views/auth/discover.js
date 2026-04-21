import { html } from "../../lib/lit-html.min.js";
import { get, post } from "../../utils/api.js";
import { getisLogin, setIsLogin, saveUserData } from "../../utils/utils.js";

function template() {
    return html`
        <section id="viewDiscover">
        <div class="content">
            <div class="chirps">
                <h2 class="titlebar">Discover</h2>
                <div id="userlist">
                    <div class="userbox">
                        <div><a href="#" class="chirp-author">vako</a></div>

                        <div class="user-details">
                            <span>3 followers</span>
                        </div>
                    </div>
                    <!-- TODO Load more user profiles -->
                </div>
            </div>
        </div>
    </section>`;
}

export async function discoverPage(ctx) {
    const isAuth = !!ctx.userData, isLogin = getisLogin();
    return ctx.render(template());
}