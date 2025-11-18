import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="dashboard">
            <h2>Job Offers</h2>

            <!-- Display a div with information about every post (if any)-->
            <div class="offer">
                <img src="./images/example1.png" alt="example1"/>
                <p>
                    <strong>Title: </strong><span class="title">Sales Manager</span>
                </p>
                <p><strong>Salary:</strong><span class="salary">1900</span></p>
                <a class="details-btn" href="">Details</a>
            </div>
            <div class="offer">
                <img src="./images/example2.png" alt="example2"/>
                <p>
                    <strong>Title: </strong
                    ><span class="title">Senior Frontend Software Engineer</span>
                </p>
                <p><strong>Salary:</strong><span class="salary">7000</span></p>
                <a class="details-btn" href="">Details</a>
            </div>
            <div class="offer">
                <img src="./images/example3.png" alt="./images/example3.png"/>
                <p>
                    <strong>Title: </strong
                    ><span class="title">Invoice Administrator</span>
                </p>
                <p><strong>Salary:</strong><span class="salary">1700</span></p>
                <a class="details-btn" href="">Details</a>
            </div>

            <!-- Display an h2 if there are no posts -->
            <h2>No offers yet.</h2>
        </section>
    `;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}