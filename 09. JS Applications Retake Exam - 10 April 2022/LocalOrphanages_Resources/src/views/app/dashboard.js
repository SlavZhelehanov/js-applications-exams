import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";

function template(data) {
    return html`
        <section id="dashboard-page">
            <h1 class="title">All Posts</h1>

            ${0 < data.length
                    ? html`
                        <div class="all-posts">
                            ${data.map(post => html`<div class="post">
                                <h2 class="post-title">${post.title}</h2>
                                <img class="post-image" src=${post.imageUrl} alt="Material Image">
                                <div class="btn-wrapper">
                                    <a href="/details/${post._id}" class="details-btn btn">Details</a>
                                </div>
                            </div>`)}
                        </div>`
                    : '<h1 class="title no-posts-title">No posts yet!</h1>'}
        </section>
    `;
}

export async function dashboardPage(ctx) {
    let data = [];

    try {
        data = await get("/data/posts?sortBy=_createdOn%20desc");
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}