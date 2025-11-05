import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <h2>Current Events</h2>
        <section id="dashboard">
            <!-- Display a div with information about every post (if any)-->
            <div class="event">
                <img src="./images/large_deniroparty_marquee.jpg" alt="example1"/>
                <p class="title">
                    Robert De Niro Themed Party
                </p>
                <p class="date">15.04.2023 from 17:00</p>
                <a class="details-btn" href="">Details</a>
            </div>
            <div class="event">
                <img src="./images/pexels-run-ffwpu-2530130 (1).jpg" alt="example1"/>
                <p class="title">
                    Fun Run
                </p>
                <p class="date">19.04.2023 from 13:00</p>
                <a class="details-btn" href="">Details</a>
            </div>
            <div class="event">
                <img src="./images/pexels-victoria-akvarel-4873622.jpg" alt="example1"/>
                <p class="title">
                    Art & Wine
                </p>
                <p class="date">17.04.2023 from 18:00</p>
                <a class="details-btn" href="">Details</a>
            </div>
        </section>

        <!-- Display an h4 if there are no posts -->
        <h4>No Events yet.</h4>
    `;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}