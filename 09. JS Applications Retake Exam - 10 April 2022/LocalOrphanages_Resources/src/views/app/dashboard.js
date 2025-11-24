import {html} from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="dashboard-page">
            <h1 class="title">All Posts</h1>

            <!-- Display a div with information about every post (if any)-->
            <div class="all-posts">
                <div class="post">
                    <h2 class="post-title">Clothes</h2>
                    <img class="post-image" src="./images/clothes.jpeg" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/neshto-si" class="details-btn btn">Details</a>
                    </div>
                </div>

                <div class="post">
                    <h2 class="post-title">Toys</h2>
                    <img class="post-image" src="./images/toys.jpeg" alt="Kids clothes">
                    <div class="btn-wrapper">
                        <a href="#" class="details-btn btn">Details</a>
                    </div>
                </div>

                <div class="post">
                    <h2 class="post-title">School Supplies</h2>
                    <img class="post-image" src="./images/school-supplies.jpeg" alt="Kids clothes">
                    <div class="btn-wrapper">
                        <a href="#" class="details-btn btn">Details</a>
                    </div>
                </div>
            </div>

            <!-- Display an h1 if there are no posts -->
            <h1 class="title no-posts-title">No posts yet!</h1>
        </section>
    `;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}