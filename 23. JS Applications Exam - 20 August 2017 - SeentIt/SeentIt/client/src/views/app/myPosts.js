import { html } from "../../lib/lit-html.min.js";
import { get, del } from "../../utils/api.js";
import { calcTime } from "../../utils/utils.js";

function template({ data, onDelete }) {
    return html`
        <section id="viewMyPosts">
            <div class="post post-content">
                <h1>Your Posts</h1>
            </div>
            <div class="posts">
                ${0 < data.length
            ? data.map((el, idx) => html`
                        <article class="post">
                    <div class="col rank">
                        <span>${idx + 1}</span>
                    </div>
                    <div class="col thumbnail">
                        <a href=${el.url}>
                            <img src=${el.imageUrl}>
                        </a>
                    </div>
                    <div class="post-content">
                        <div class="title">
                            <a href=${el.url}>
                                ${el.title}
                            </a>
                        </div>
                        <div class="details">
                            <div class="info">
                                submitted ${calcTime(el.createdAt)} ago by pesho
                            </div>
                            <div class="controls">
                                <ul>
                                    <li class="action"><a class="commentsLink" href="/details/${el.postId}">comments</a></li>
                                    <li class="action"><a class="editLink" href="/edit/${el.postId}">edit</a></li>
                                    <li class="action"><a @click=${() => onDelete(el.postId)} class="deleteLink" href="#">delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </article>`)
            : html`<h3>No posts in database</h3>`
        }                
            </div>
        </section>`;
}

export async function myPostsPage(ctx) {
    let data = [];

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/app/post/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }
    }

    try {
        data = await get('/app/my');
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(template({ data, onDelete }));
}