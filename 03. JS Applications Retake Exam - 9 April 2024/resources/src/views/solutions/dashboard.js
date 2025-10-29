import {html} from "../../../node_modules/lit-html/lit-html.js";

function template() {
    return html`
        <h2>Solutions</h2>
        <section id="solutions">
            <!-- Display a div with information about every post (if any)-->
            <div class="solution">
                <img src="./images/Bioremediation.png" alt="example1"/>
                <div class="solution-info">
                    <h3 class="type">Bioremediation</h3>
                    <p class="description">
                        Synthetic biology involves the design and construction of
                        biological systems for useful purposes.
                    </p>
                    <a class="details-btn" href="#">Learn More</a>
                </div>
            </div>
            <div class="solution">
                <img src="./images/Nanotechnology.png" alt="example2"/>
                <div class="solution-info">
                    <h3 class="type">Nanotechnology</h3>
                    <p class="description">
                        Nanotechnology offers solutions for environmental cleanup due to
                        its ability to manipulate materials at the nanoscale
                    </p>
                    <a class="details-btn" href="">Learn More</a>
                </div>
            </div>
            <div class="solution">
                <img src="./images/Phytoremediation.png" alt="example3"/>
                <div class="solution-info">
                    <h3 class="type">Phytoremediation</h3>
                    <p class="description">
                        Phytoremediation is a green technology that utilizes plants to
                        remove contaminants from soil, water, and air.
                    </p>
                    <a class="details-btn" href="#">Learn More</a>
                </div>
            </div>
        </section>

        <!-- Display an h2 if there are no posts -->
<!--        <h2 id="no-solution">No Solutions Added.</h2>-->
    `;
}

export function dashboardPage(ctx) {
    ctx.render(template());
}