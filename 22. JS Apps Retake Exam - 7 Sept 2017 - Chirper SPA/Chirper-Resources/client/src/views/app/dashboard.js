import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`<section id="viewDiscover">
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
    </section> `;
}

export async function dashboardPage(ctx) {
    return ctx.render(template());
}